import React from 'react';
import styled from 'styled-components';
import { Field, Form, Formik } from 'formik';
import Button from '../shared/button';

import useUser from '../../hooks/use-user';
import useProject from '../../hooks/use-project';

import DisciplineSelect from './components/discipline-select';
import OrganizationSelect from './components/organization-select';
import StatusSelect from './components/status-select';

const Container = styled.div`
  form {
    width: 70%;
    margin: 0 auto;
  }

  h2 {
    padding-left: 10%;
    margin-bottom: 50px;
  }

  section {
    margin-bottom: 50px;
  }

  .details {
    margin-bottom: 20px;
    color: rgba(0, 0, 0, 0.5);
  }

  .details h5 {
    margin-bottom: 0px;
  }
`;

const FieldContainer = styled.div`
  display: flex;
  margin-bottom: 20px;

  span {
    margin-right: 10px;
    width: 40%;
  }

  .input {
    display: block;
    width: 100%;
    border-radius: 5px;
    border: 1px solid hsl(0, 0%, 80%);
    // box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    padding: 10px 10px;
    outline: none;
  }

  .select {
    width: 100%;
  }
`;

const ValueField = ({ title, name, component, placeholder }) => (
  <FieldContainer>
    <span>{title}</span>
    <Field name={name} className="input" placeholder={placeholder} component={component} />
  </FieldContainer>
);

const SubmitProject = ({ history }) => {
  const { user } = useUser();
  const { createProject } = useProject();

  const handleSubmit = async (values) => {
    if (user) {
      const payload = await createProject({
        ...values,
        team: [ user.id ],
        admin: [ user.id ],
      });
      if (payload) {
        history.replace(`/projects/${ payload.value.result }`, { id: payload.value.result });
      }
    }
  };

  return (
    <Container>
      <h2>Submit a Project</h2>
      <Formik
        initialValues={{ name: '', description: '', tags: [] }}
        onSubmit={handleSubmit}
        render={() => (
          <Form>
            <section>
              <div className="details">
                <h5>Step 1: Basic Info</h5>
              </div>
              <ValueField
                title="Project Name"
                name="name"
                component="input"
                placeholder="e.g Thinkspaces"
              />
              <ValueField
                title="Description"
                name="description"
                component="input"
                placeholder="e.g. A community of creators!"
              />
              <ValueField
                title="About"
                name="about"
                component="textarea"
                placeholder="e.g. Welcome to our platform, we connect teams..."
              />
            </section>
            <section>
              <div className="details">
                <h5>Step 2: Project Tags</h5>
                <span>These tags will help users find your project</span>
              </div>
              <Field
                name="tags"
                render={({ field, form }) => (
                  <>
                    <FieldContainer>
                      <span>Discipline</span>
                      <DisciplineSelect field={field} form={form} />
                    </FieldContainer>
                    <FieldContainer>
                      <span>Organization</span>
                      <OrganizationSelect field={field} form={form} />
                    </FieldContainer>
                    <FieldContainer>
                      <span>Status</span>
                      <StatusSelect field={field} form={form} />
                    </FieldContainer>
                  </>
                )}
              />
            </section>
            {/* <section>
            <div className="details">
              <h5>Step 3: Who you need</h5>
              <span>These tags will help users find your project</span>
            </div>
            <ValueField title="Role" name="role" component="input" />
            <ValueField
              title="Description of Responsibilities"
              name="responsibilities"
              component="textarea"
            />
          </section> */}
            <Button type="submit">Submit Project</Button>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          </Form>
        )}
      />
    </Container>
  );
};

export default SubmitProject;
