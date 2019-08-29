// import { normalize } from 'normalizr';
import { createAction } from 'redux-actions';
// import { schema } from '../../../utils';
import { db, auth, User } from '../../../firebase';

export const setUser = createAction('SET_USER', async (authUser) => {
  const user = await db.get('users')(authUser.uid);
  return user;
});

export const loginUser = createAction('LOGIN', async ({ email, password }) => {
  const response = await auth.signInUser(email, password);
  const user = await db.get('users')(response.user.uid);
  return user;
});

export const createUser = createAction('CREATE_USER', async ({ uid, ...values }) => {
  const id = await User.create(uid)(values);
  return { id, ...values };
});

export const logoutUser = createAction('LOGOUT', auth.signOutUser);
