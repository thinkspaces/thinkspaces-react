import { auth } from "./firebase";

export const createUser = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const signInUser = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const signOutUser = () => auth.signOut();

export const isLoggedIn = () => {
  var user = auth.currentUser;
  var loggedIn = false;
  if (user) {
    loggedIn = true;
  }
  return loggedIn;
};
