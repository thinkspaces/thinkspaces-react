import { auth } from "./firebase";

export const createUser = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const signInUser = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const isSignedIn = () => {
  // let user = auth.currentUser;
  return auth.currentUser !== null;
  // let loginState = false;
  // if(user != null){
  //     loginState = true;
  // }
  // return loginState;
};
