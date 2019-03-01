import { storage } from './firebase';

export const uploadProfileImage = async (uid, file) => {
  const pictureRef = storage.ref(`images/users/${ uid }/profile`);
  await pictureRef.put(file);
  return pictureRef.getDownloadURL();
};

export const removeProfileImage = async (uid) => {
  const pictureRef = storage.ref(`images/users/${ uid }/profile`);
  await pictureRef.delete();
};
