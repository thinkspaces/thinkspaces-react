import { handleActions } from 'redux-actions';

import { getTags } from '../actions';

const reducer = handleActions(
  {
    [getTags]: {
      FULFILLED: (state, { payload }) => ({
        ...state,
        ...payload.entities.tags,
      }),
    },
  },
  {},
);

export default reducer;
