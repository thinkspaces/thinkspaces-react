import { auth } from "./firebase";

export const createUser = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const signInUser = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const signOutUser = () => auth.signOut();

export const isLoggedIn = () => !!auth.currentUser;

export const isCurrentAuthUser = uid => {
  if (auth.currentUser) return auth.currentUser.uid === uid;
  else return false;
};

// export const verifyUser = () => {
//     var user = auth.currentUser;

//     user.sendEmailVerification().then(function() {
//       // Email sent.
//     }).catch(function(error) {
//       // An error happened.
//     });
// }

export const getUserInfo = () => auth.currentUser;

export const passwordResetEmail = email => auth.sendPasswordResetEmail(email);
