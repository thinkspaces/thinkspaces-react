import { handleActions } from 'redux-actions';
import { setUser, loginUser, logoutUser, createUser } from '../actions';

const reducer = handleActions(
  {
    [setUser]: {
      FULFILLED: (state, action) => action.payload,
    },
    [loginUser]: {
      FULFILLED: (state, action) => action.payload,
    },
    [logoutUser]: {
      FULFILLED: () => ({}),
    },
    [createUser]: {
      FULFILLED: (state, action) => action.payload,
    },
  },
  {},
);

export default reducer;
