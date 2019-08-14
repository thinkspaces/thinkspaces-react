import React from 'react';
import { FieldArray, Field } from 'formik';
import ProjectLink from './components/ProjectLink';

const AddLink = ({ onClick }) => (
  <button type="button" onClick={onClick} className="defBtn neutral">
    Add a link
  </button>
);

const LinksArray = ({ field, handleRadio, form }) => (
  <FieldArray
    name="links"
    render={arrayHelpers => (
      <div>
        {field.value && field.value.length > 0 ? (
          field.value.map((link, index) => (
            <ProjectLink
              primary={link.primary}
              index={index}
              handleRadio={handleRadio(index, field.value, form)}
              onRemove={() => arrayHelpers.remove(index)}
              onAdd={() => arrayHelpers.insert(index + 1, { name: '', url: '', primary: false })}
            />
          ))
        ) : (
          <AddLink onClick={() => arrayHelpers.push({ name: '', url: '', primary: true })} />
        )}
      </div>
    )}
  />
);

const LinksForm = () => {
  const handleRadio = (index, links, form) => () => {
    const _links = links.map((link, i) => {
      if (i === index) {
        return { ...link, primary: true };
      }
      return { ...link, primary: false };
    });
    form.setValues({ ...form.values, links: _links });
  };

  return (
    <section>
      <div>
        <h2>Add links</h2>
        <p>
          Link to external websites, social platforms, YouTube videos and more. We will parse each
          link, and show rich previews and icons on your project listing where possible.
        </p>
      </div>
      <Field component={LinksArray} name="links" handleRadio={handleRadio} />
    </section>
  );
};

export default LinksForm;
