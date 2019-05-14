import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import SaveButton from '../../../../shared/save-button'
import { TagBucket, Tag, Project } from '../../../../../firebase/db';

import styles from './ProjectTagsForm.module.css';

const ProjectTagsForm = (props) => {
  const { pid } = props
  const project = new Project(pid);
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ categoryTags, setCategoryTags ] = useState([]);
  const [ chosenTags, setChosenTags ] = useState([])

  const handleSetup = async () => {
    setLoading(true);
    // set active tags
    const activeTags = await project.readTags()
    // modify for use with react-select
    activeTags.forEach((tag) => {
      tag.value = tag.id;
      tag.label = tag.name;
    });
    // update state
    setChosenTags(activeTags);
    // set all available tags
    const bucket = new TagBucket('project-category')
    const bucketTags = await bucket.readTags()
    // modify for use with react-select
    bucketTags.forEach((tag) => {
      tag.value = tag.id;
      tag.label = tag.name;
    });
    // update state
    setCategoryTags(bucketTags);
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
    await project.deleteTags();
    // set all new tags for project
    const tags = chosenTags.map(tag => new Tag(undefined, undefined, tag.ref))
    tags.forEach(async (tag) => { await project.updateTag(tag) })
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
      <h2>Tags</h2>
      <div className={styles.wrapper}>
        <h3>Project Category</h3>
        <Select
          captureMenuScroll={false}
          value={chosenTags}
          isMulti
          name="category"
          options={categoryTags}
          onChange={handleChange}
          classNamePrefix="select"
        />
        <SaveButton loading={loading} success={success} onClick={handleSave} />
      </div>
    </>
  );
}

export default ProjectTagsForm
