import uuidv1 from 'uuid/v1';
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

export const genericUpload = async (path, file) => {
  const ref = storage.ref(path);
  await ref.put(file);
  return ref.getDownloadURL();
}

export const uploadProjectImages = async (pid, imageFiles) => {
  if (!imageFiles) {
    return []
  }
  const imageURLs = []
  await Promise.all(
    imageFiles.map(async (file) => {
      const path = `images/projects/${ pid }/listing/${ uuidv1() }`
      const url = await genericUpload(path, file)
      imageURLs.push(url)
    }),
  )
  return imageURLs
}
