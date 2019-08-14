import { useSelector } from 'react-redux';
import { filter, map, reduce, isNil, isArray, concat } from 'lodash';

const useTag = (fieldValues, type, form) => {
  const allTags = useSelector(state => filter(state.data.tags, { type }));
  const { chosenTags, otherTags } = useSelector(state =>
    reduce(
      map(fieldValues, tagId => state.data.tags[tagId]),
      (result, tag) => {
        if (!isNil(tag)) {
          if (tag.type === type) result.chosenTags.push(tag);
          else result.otherTags.push(tag);
        }
        return result;
      },
      { chosenTags: [], otherTags: [] },
    ));

  const handleChanges = (value) => {
    console.log(value);
    let _chosenTags = [];
    if (isArray(value)) {
      _chosenTags = concat(map(otherTags, tag => tag.id), map(value, tag => tag.id));
    } else {
      _chosenTags = concat(map(otherTags, tag => tag.id), value.id);
    }
    form.setFieldValue('tags', _chosenTags);
  };

  // const handleSave = (values) => {
  //   actions.updateTags({ pid, tags: values, type });
  // };

  return { allTags, chosenTags, otherTags, handleChanges };
};

export default useTag;
