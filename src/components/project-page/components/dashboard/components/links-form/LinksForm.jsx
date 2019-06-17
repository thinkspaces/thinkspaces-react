import React from 'react';

import { Formik, Form, FieldArray } from 'formik';
import { LinkSchema } from '../../validation';
import useFirestoreProject from '../../../../../../hooks/use-firestore-project';

import ProjectLink from './components/ProjectLink';
import SaveButton from '../../../../../shared/save-button';

const Header = ({ title, description }) => (
  <div>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

/* show this when user has removed all friends from the list */
const AddLink = ({ onClick }) => (
  <button type="button" onClick={onClick} className="defBtn neutral">
    Add a link
  </button>
);

const LinksForm = ({ className, pid }) => {
  const { values, success, loading, handleSave } = useFirestoreProject(pid, { links: [] });

  const handleRadio = (index, links, setValues) => {
    const _links = links.map((link, i) => {
      if (i === index) {
        return { ...link, primary: true };
      }
      return { ...link, primary: false };
    });
    setValues({ links: _links });
  };

  return (
    <section className={className}>
      <Header
        title="Add links"
        description="Link to external websites, social platforms, YouTube videos and more. We will parse each
        link, and show rich previews and icons on your project listing where possible."
      />
      <Formik
        validationSchema={LinkSchema}
        enableReinitialize
        initialValues={{ links: values.links }}
        onSubmit={vals => handleSave(vals)}
        render={props => (
          <Form>
            <FieldArray
              name="links"
              render={arrayHelpers => (
                <div>
                  {props.values.links && props.values.links.length > 0 ? (
                    props.values.links.map((link, index) => (
                      <ProjectLink
                        primary={link.primary}
                        index={index}
                        handleRadio={() => handleRadio(index, props.values.links, props.setValues)}
                        onRemove={() => arrayHelpers.remove(index)}
                        onAdd={() => arrayHelpers.insert(index + 1, { name: '', url: '', primary: false })
                        }
                      />
                    ))
                  ) : (
                    <AddLink
                      onClick={() => arrayHelpers.push({ name: '', url: '', primary: true })}
                    />
                  )}
                  <SaveButton
                    loading={loading}
                    disabled={loading}
                    success={success}
                    type="submit"
                  />
                </div>
              )}
            />
          </Form>
        )}
      />
    </section>
  );
};

export default LinksForm;
