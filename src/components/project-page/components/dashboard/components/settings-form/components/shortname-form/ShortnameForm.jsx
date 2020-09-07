import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { Field } from "formik";
import { db } from "../../../../../../../../firebase";

import Tooltip from "./components/Tooltip";
import StatusIndicator from "./components/StatusIndicator";

const ShortInput = ({ field, inputRef, available, searching, handleInput }) => {
  const [init, setInit] = useState("");
  useEffect(() => {
    setInit(field.value);
  }, []);

  return (
    <div className="wrap">
      <input
        ref={inputRef}
        type="text"
        required
        name={field.name}
        pattern="^[A-Za-z0-9_]{5,20}$"
        onChange={handleInput(field)(init)}
        value={field.value}
        className="text-input"
        placeholder="Unique shortname e.g. thinkspaces"
      />
      <StatusIndicator available={available} searching={searching} />
    </div>
  );
};

const ShortnameForm = ({ className }) => {
  const inputRef = useRef(null);
  // const [ valid, setValid ] = useState(true);
  const [available, setAvailable] = useState(true);
  const [searching, setSearching] = useState(false);

  const validate = () => {
    // check form is valid via ref
    const form = inputRef.current;
    if (form) {
      form.checkValidity();
      // if (form.checkValidity()) {
      //   setValid(true);
      // } else {
      //   setValid(false);
      // }
    }
  };

  const resolveProjects = (init) => async (promise) => {
    setAvailable(false);
    setSearching(true);
    const projects = await promise;
    if (projects.length > 0) {
      if (projects[0].shortname === init) {
        setAvailable(true);
      } else {
        setAvailable(false);
      }
    } else {
      // if no project was found
      setAvailable(true);
    }
    setSearching(false);
  };

  const handleInput = (field) => (init) => async (event) => {
    const sanitized = event.target.value.trim();
    field.onChange(event);
    const promise = db.getAllByFilter("projects")(
      db.where("shortname")("==")(sanitized)
    );
    resolveProjects(init)(promise);
    validate();
  };

  return (
    <section className={className}>
      <h3>Set shortname</h3>
      <Field
        inputRef={inputRef}
        name="shortname"
        component={ShortInput}
        handleInput={handleInput}
        available={available}
        searching={searching}
      />
      <Tooltip />
    </section>
  );
};

export default styled(ShortnameForm)`
  margin-bottom: 50px;

  .wrap {
    display: flex;
    align-items: center;
    width: 80%;
  }

  .wrap > * {
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    .wrap {
      width: 100%;
    }
  }
`;
