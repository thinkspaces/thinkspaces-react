// Libraries
import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { Field } from "formik";

// Components
import CategoryForm from "./components/category-form";
import OrganizationForm from "./components/organization-form";
import ReleaseForm from "./components/release-form";

import { getTags } from "../../../../../app/actions";

const TagsForm = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators({ getTags }, dispatch);
  useEffect(() => {
    actions.getTags();
  }, []);

  return (
    <section>
      <h2>Tags</h2>
      <hr />
      <Field
        name="tags"
        render={({ field, form }) => (
          <>
            <CategoryForm field={field} form={form} />
            <OrganizationForm field={field} form={form} />
            <ReleaseForm field={field} form={form} />
          </>
        )}
      />
    </section>
  );
};

export default TagsForm;
