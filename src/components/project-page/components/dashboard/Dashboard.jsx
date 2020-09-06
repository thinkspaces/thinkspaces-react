// Libraries
import React, { useState } from "react";
import { Formik, Form } from "formik";
import styled from "styled-components";

// Components
import Button from "components/shared/button";
import ImagesForm from "components/project-page/components/dashboard/components/images-form";
import DescriptionForm from "components/project-page/components/dashboard/components/description-form";
import TagsForm from "components/project-page/components/dashboard/components/tags-form";
import TeamForm from "components/project-page/components/dashboard/components/team-form";
import LinksForm from "components/project-page/components/dashboard/components/links-form";
import RolesForm from "components/project-page/components/dashboard/components/roles-form";
import SettingsForm from "components/project-page/components/dashboard/components/settings-form";
import Header from "components/project-page/components/dashboard/components/header";
import Sidebar from "components/project-page/components/dashboard/components/sidebar";

// Hooks
import useProject from "hooks/use-project";

const Container = styled.div`
  .dashboard {
    display: grid;
    grid-template-columns: 0.3fr 1fr;
    grid-template-rows: 1fr 50px;
    grid-template-areas:
      "menu forms"
      "menu toolbar";

    border: 1px solid var(--color-disabled);
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    .dashboard {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto;
      grid-template-areas:
        "menu"
        "forms"
        "toolbar";
      grid-row-gap: 10px;

      border: none;
    }
  }

  .toolbar {
    justify-self: end;
    align-self: center;
    margin-right: 10px;
    grid-area: toolbar;
  }
`;

const ContentPanel = styled.div`
  grid-area: forms;
  padding: 25px;
  border-bottom: 1px solid var(--color-disabled);

  @media (max-width: 768px) {
    border: 1px solid var(--color-disabled);
    border-radius: 5px;
  }
`;

const Dashboard = ({ pid, onClose }) => {
  const { project, updateProject } = useProject(pid);
  const [currentForm, setCurrentForm] = useState(<DescriptionForm />);

  const handleSidebar = (event) => {
    switch (event.target.name) {
      case "description":
        setCurrentForm(<DescriptionForm />);
        break;
      case "images":
        setCurrentForm(<ImagesForm />);
        break;
      case "tags":
        setCurrentForm(<TagsForm />);
        break;
      case "team":
        setCurrentForm(<TeamForm />);
        break;
      case "links":
        setCurrentForm(<LinksForm />);
        break;
      case "roles":
        setCurrentForm(<RolesForm />);
        break;
      case "settings":
        setCurrentForm(<SettingsForm pid={pid} />);
        break;
      default:
        setCurrentForm(<DescriptionForm />);
        break;
    }
  };

  const handleSubmit = (values) => {
    updateProject(values);
    setTimeout(onClose, 3000);
  };

  return (
    <Container>
      <Header close={onClose} />
      <Formik
        enableReinitialize
        initialValues={{ ...project }}
        onSubmit={handleSubmit}
        render={() => (
          <Form>
            <section className="dashboard">
              <Sidebar onSelectCategory={handleSidebar} />
              <ContentPanel>{currentForm}</ContentPanel>
              <div className="toolbar">
                <Button type="submit" variant="filled">
                  Save
                </Button>
              </div>
            </section>
          </Form>
        )}
      />
    </Container>
  );
};

export default Dashboard;
