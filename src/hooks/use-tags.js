import { useState } from 'react';
import useLoader from './use-loader';

import { db, Project } from '../firebase';

export default (pid, type) => {
  const [ tags, setTags ] = useState([]);
  const [ chosenTags, setChosenTags ] = useState([]);

  const handleChange = (_tags) => {
    setChosenTags(_tags);
  };

  const setup = async () => {
    // set active tags
    let activeTags = await Project.getMembersFromFieldArray('tags')('tags')(pid);
    activeTags = activeTags.filter(tag => tag.type === type);

    // modify for use with react-select
    let _tags = activeTags.map(tag => ({ ref: tag.ref, value: tag.id, label: tag.name }));
    // update state
    setChosenTags(_tags);
    // set all available tags
    const availableTags = await db.getAllByFilter('tags')(db.where('type')('==')(type));
    // modify for use with react-select
    _tags = availableTags.map(tag => ({ ref: tag.ref, value: tag.id, label: tag.name }));
    setTags(_tags);
  };

  const saveHandler = async () => {
    // delete all previous tags for project
    await Project.dropTags(pid)(type);
    // set all new tags for project
    const _tags = chosenTags.map(tag => tag.value);
    // update Project Tags

    await Promise.all(
      _tags.map(async (tagId) => {
        await Project.updateFieldArrayWithId(db.add)('tags')(pid)(tagId);
      }),
    );
  };

  const { success, loading, handleSave } = useLoader(setup, saveHandler);
  return { handleSave, handleChange, loading, success, tags, chosenTags };
};
