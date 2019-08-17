import { handleActions } from 'redux-actions';
import { setUser, loginUser, logoutUser } from '../actions';

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
  },
  {},
);

export default reducer;
