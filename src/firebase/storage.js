import uuidv1 from 'uuid/v1';
import idx from 'idx'
import { storage } from './firebase';
import { getProjectByID } from './db';
import urlToFile from '../components/utils/urlToFile';

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
  const imageURLs = await Promise.all(
    imageFiles.map(async (file) => {
      const path = `images/projects/${ pid }/listing/${ uuidv1() }`
      return genericUpload(path, file)
    }),
  )
  return imageURLs
}

// unfortunately, Cloud Storage cannot list all files in a directory
// therefore, the images must be retrieved from the db
export const downloadProjectImages = async (pid) => {
  // use the database to fetch the project
  const project = await getProjectByID(pid);
  const imageURLs = idx(project, obj => obj.images);
  if (imageURLs === undefined) { return [] }

  // download project images in order
  const imageFiles = await Promise.all(
    imageURLs.map(async (url) => {
      // get reference to file
      const ref = storage.refFromURL(url);

      // get metadata for the file
      let metadata = null;
      try {
        metadata = await ref.getMetadata();
      } catch (e) {
        console.log(e);
      }

      // construct a file object with the URL and metadata
      if (metadata) {
        return urlToFile(url, metadata.name, metadata.contentType)
      }
    }),
  )

  // generate previews for each file
  const imagePreviews = imageFiles.map(file => URL.createObjectURL(file));

  // return both the files and previews as an object
  return { imageFiles,
    imagePreviews }
}

export const deleteProjectImages = async (pid) => {
  const project = await getProjectByID(pid);
  const imageURLs = project.images;
  if (imageURLs) {
    await Promise.all(
      imageURLs.map(async (url) => {
        const ref = await storage.refFromURL(url);
        try {
          await ref.delete();
        } catch (e) {
          console.log(e);
        }
      }),
    )
  }
}
