import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import SaveButton from '../../../../../shared/save-button'
import { Tag, Project } from '../../../../../../firebase/models';

import styles from './ProjectCategoryForm.module.css';

const ProjectCategoryForm = (props) => {
  const { pid } = props
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ categoryTags, setCategoryTags ] = useState([]);
  const [ chosenTags, setChosenTags ] = useState([])

  const handleSetup = async () => {
    setLoading(true);
    // set active tags
    const activeTags = await Project.getTags(pid, 'project-category')
    // modify for use with react-select
    activeTags.forEach((tag) => {
      tag.value = tag.id;
      tag.label = tag.name;
    });
    // update state
    setChosenTags(activeTags);
    // set all available tags
    const availableTags = await Tag.getAll('project-category')
    // modify for use with react-select
    availableTags.forEach((tag) => {
      tag.value = tag.id;
      tag.label = tag.name;
    });
    // update state
    setCategoryTags(availableTags);
    setLoading(false);
  }

  const handleChange = (tags) => {
    setChosenTags(tags)
  }

  const handleSave = async () => {
    // start loading
    setSuccess(false);
    setLoading(true);
    // delete all previous tags for project
    await Project.dropTags(pid, 'project-category');
    // set all new tags for project
    const tags = chosenTags.map(tag => tag.id)
    tags.forEach(async (tagId) => { await Project.addTag(pid, tagId) })
    // stop loading
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false)
    }, 1000)
  };

  useEffect(() => {
    handleSetup();
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <h3>Category</h3>
        <span className="helpText">Choose tags that best describe the category or discipline your project falls under.</span>
        <Select
          captureMenuScroll={false}
          value={chosenTags}
          isMulti
          name="category"
          options={categoryTags}
          onChange={handleChange}
          classNamePrefix="select"
        />
        <SaveButton loading={loading} disabled={loading} success={success} onClick={handleSave} />
      </div>
    </>
  );
}

export default ProjectCategoryForm
