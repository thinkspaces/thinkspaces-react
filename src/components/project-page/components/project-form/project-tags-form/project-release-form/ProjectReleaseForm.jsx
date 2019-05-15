import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import SaveButton from '../../../../../shared/save-button'
import { TagBucket, Tag, Project } from '../../../../../../firebase/db';

import styles from './ProjectReleaseForm.module.css';

const ProjectReleaseForm = (props) => {
  const { pid } = props
  const project = new Project(pid);
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ releaseTags, setReleaseTags ] = useState([]);
  const [ chosenTags, setChosenTags ] = useState([])

  const handleSetup = async () => {
    setLoading(true);
    // set active tags
    const activeTags = await project.readTags('release-status')
    // modify for use with react-select
    activeTags.forEach((tag) => {
      tag.value = tag.id;
      tag.label = tag.name;
    });
    // update state
    setChosenTags(activeTags);
    // set all available tags
    const bucket = new TagBucket('release-status')
    const bucketTags = await bucket.readTags()
    // modify for use with react-select
    bucketTags.forEach((tag) => {
      tag.value = tag.id;
      tag.label = tag.name;
    });
    // update state
    setReleaseTags(bucketTags);
    setLoading(false);
  }

  const handleChange = (tag) => {
    setChosenTags([ tag ])
  }

  const handleSave = async () => {
    // start loading
    setSuccess(false);
    setLoading(true);
    // delete all previous tags for project
    await project.deleteTags('release-status');
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
      <div className={styles.wrapper}>
        <h3>Release status</h3>
        <span className="helpText">Choose a tag that best describes how mature your project is.</span>
        <Select
          captureMenuScroll={false}
          value={chosenTags}
          name="release-status"
          options={releaseTags}
          onChange={handleChange}
          classNamePrefix="select"
        />
        <SaveButton loading={loading} disabled={loading} success={success} onClick={handleSave} />
      </div>
    </>
  );
}

export default ProjectReleaseForm