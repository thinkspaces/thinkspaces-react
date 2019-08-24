import React from 'react';
import styled from 'styled-components';
import { Field, FieldArray } from 'formik';
import ProjectLink from './components/ProjectLink';

const ContactArea = styled.div`
  width 60%;
  margin-bottom: 20px;
`;

const AddLink = ({ onClick }) => (
  <button type="button" onClick={onClick} className="defBtn neutral">
    Add a role
  </button>
);

const RolesArray = ({ field }) => (
  <FieldArray
    name="roles"
    render={arrayHelpers => (
      <div>
        {field.value && field.value.length > 0 ? (
          field.value.map((role, index) => (
            <ProjectLink
              primary={role.primary}
              index={index}
              onRemove={() => arrayHelpers.remove(index)}
              onAdd={() => arrayHelpers.insert(index + 1, { name: '', description: '' })}
            />
          ))
        ) : (
          <AddLink onClick={() => arrayHelpers.push({ name: '', description: '' })} />
        )}
      </div>
    )}
  />
);

const RolesForm = () => (
  <section>
    <h2>Roles</h2>
    <p>
      Set up descriptive roles (positions) that your team is looking for. This will help with making
      an impactful project page on the platform.
    </p>
    <h5>Contact Email</h5>
    <ContactArea>
      <Field name="contact" placeholder="e.g. name@example.com" className="text-input" />
    </ContactArea>
    <Field component={RolesArray} name="roles" />
  </section>
);

export default RolesForm;
