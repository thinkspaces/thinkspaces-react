import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get, filter, map } from 'lodash';
import { updateTags } from '../components/app/actions';

const useTag = (pid, type) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators({ updateTags }, dispatch);

  const tags = useSelector(state => filter(state.data.tags, { type }));
  const chosenTags = useSelector(state =>
    filter(map(get(state.data.projects[pid], 'tags', []), tagId => state.data.tags[tagId]), {
      type,
    }));

  const handleSave = (values) => {
    actions.updateTags({ pid, tags: values, type });
  };

  return { tags, chosenTags, handleSave };
};

export default useTag;
