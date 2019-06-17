import { useState } from 'react';
import useLoader from './use-loader';

import { Tag, Project } from '../firebase/models';

export default (pid, type) => {
  const [ tags, setTags ] = useState([]);
  const [ chosenTags, setChosenTags ] = useState([]);

  const handleChange = (_tags) => {
    setChosenTags(_tags);
  };

  const setup = async () => {
    // set active tags
    const activeTags = await Project.getTags(pid, type);
    // modify for use with react-select
    let _tags = activeTags.map(tag => ({ ref: tag.ref, value: tag.id, label: tag.name }));
    // update state
    setChosenTags(_tags);
    // set all available tags
    const availableTags = await Tag.getAll(type);
    // modify for use with react-select
    _tags = availableTags.map(tag => ({ ref: tag.ref, value: tag.id, label: tag.name }));
    setTags(_tags);
  };

  const saveHandler = async () => {
    // delete all previous tags for project
    await Project.dropTags(pid, type);
    // set all new tags for project
    const _tags = chosenTags.map(tag => tag.value);
    // update Project Tags
    _tags.forEach(async (tagId) => {
      await Project.addTag(pid, tagId);
    });
  };

  const { success, loading, handleSave } = useLoader(setup, saveHandler);
  return { handleSave, handleChange, loading, success, tags, chosenTags };
};
