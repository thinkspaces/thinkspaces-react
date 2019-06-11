import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import SaveButton from '../../../../../shared/save-button'
import { Tag, Project } from '../../../../../../firebase/models';

import styles from './ProjectReleaseForm.module.css';

const ProjectReleaseForm = (props) => {
  const { pid } = props
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ releaseTags, setReleaseTags ] = useState([]);
  const [ chosenTags, setChosenTags ] = useState([])

  const handleSetup = async () => {
    setLoading(true);
    // set active tags
    const activeTags = await Project.getTags(pid, 'release-status')
    // modify for use with react-select
    activeTags.forEach((tag) => {
      tag.value = tag.id;
      tag.label = tag.name;
    });
    // update state
    setChosenTags(activeTags);
    // set all available tags
    const availableTags = await Tag.getAll('release-status')
    // modify for use with react-select
    availableTags.forEach((tag) => {
      tag.value = tag.id;
      tag.label = tag.name;
    });
    // update state
    setReleaseTags(availableTags);
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
    await Project.dropTags(pid, 'release-status');
    // set all new tags for project
    const tags = chosenTags.map(tag => tag.id)
    tags.forEach(async (tag) => { await Project.addTag(pid, tag) })
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
