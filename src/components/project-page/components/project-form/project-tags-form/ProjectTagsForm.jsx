import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    // set active tags
    const activeTags = await project.readTags()
    activeTags.forEach((tag) => {
      tag.value = tag.id
      tag.label = tag.name
    })
    setChosenTags(activeTags);

    // set all available tags
    const bucket = new TagBucket('project-category')
    const bucketData = await bucket.read()
    bucketData.tags.forEach((tag) => {
      tag.value = tag.id
      tag.label = tag.name
    })
    setCategoryTags(bucketData.tags);
  }

  const handleChange = (tags) => {
    setChosenTags(tags)
  }

  const handleSave = async () => {
    // start loading
    setLoading(true);
    // delete all previous tags for project
    project.deleteTags();
    // set all new tags for project
    const tags = chosenTags.map(tag => new Tag(undefined, undefined, tag.ref))
    tags.forEach((tag) => { project.updateTag(tag) })
    // stop loading
    setLoading(false);
    // show check mark
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
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
        <div className={styles.save}>
          <button type="button" className="defBtn" onClick={handleSave}>
            Save
          </button>
          {
            loading ? (
              <div className="fade-in-animation">
                <FontAwesomeIcon icon="circle-notch" spin />
              </div>
            ) : null
        }
          {
            success ? (
              <div className="fade-in-animation">
                <FontAwesomeIcon icon="check-circle" />
              </div>
            ) : null
        }
        </div>
      </div>
    </>
  );
}

export default ProjectTagsForm
