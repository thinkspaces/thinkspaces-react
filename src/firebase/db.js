/* eslint-disable no-use-before-define */
import { db, auth, createTimestamp } from './firebase';

export const updateLikes = async (pid, likes) => {
  await db
    .collection('projects')
    .doc(pid)
    .update({ likes, likesCount: Object.keys(likes).length });
};

export const createUserwithFields = async (uid, profileData) => {
  await db
    .collection('users')
    .doc(uid)
    .set({ ...profileData,
      profilepicture: '',
      createdTimestamp: createTimestamp(new Date()) });
};

// how to determine what data to set and what to add
export const saveProfileChanges = async (profile) => {
  const user = auth.currentUser;
  if (user) {
    await db
      .collection('users')
      .doc(user.uid)
      .update({ ...profile });
  }
};

export const updateProfilePicture = async (url = '') => {
  const user = auth.currentUser;
  if (user) {
    await db
      .collection('users')
      .doc(user.uid)
      .update({ profilepicture: url });
  }
};

export const saveProjectPicture = async (id, url) => {
  await db
    .collection('projects')
    .doc(id)
    .update({ images: [ url ] });
};

export const createProfilePostWithFields = async (
  description,
  timestamp,
  uid,
) => {
  const docRef = await db
    .collection(`users/${ uid }/posts`)
    .add({ timestamp: createTimestamp(timestamp), description });
  return docRef.id;
};

export const createProjectPostWithFields = async (
  description,
  timestamp,
  projectId,
) => {
  const docRef = await db
    .collection(`projects/${ projectId }/posts`)
    .add({ timestamp: createTimestamp(timestamp), description });
  return docRef.id;
};

export const getProfilePosts = async (uid) => {
  const posts = [];

  const querySnapshot = await db
    .collection(`users/${ uid }/posts`)
    .orderBy('timestamp', 'asc')
    .get();

  querySnapshot.forEach((doc) => {
    let timestamp = doc.get('timestamp');
    const date = timestamp.toDate();
    timestamp = `${ date.getMonth() }/${ date.getDate() }/${ date.getFullYear() }`;
    posts.push({ description: doc.get('description'),
      timestamp,
      pid: doc.id });
  });

  return posts;
};

export const getProjectPosts = async (projectId) => {
  // console.log(projectId);
  const posts = [];

  const querySnapshot = await db
    .collection(`projects/${ projectId }/posts`)
    .orderBy('timestamp', 'asc')
    .get();

  querySnapshot.forEach((doc) => {
    let timestamp = doc.get('timestamp');
    const date = timestamp.toDate();
    timestamp = `${ date.getMonth() }/${ date.getDate() }/${ date.getFullYear() }`;
    posts.push({ description: doc.get('description'),
      timestamp,
      pid: doc.id });
  });

  return posts;
};

export const removePost = async (uid, pid) => {
  await db
    .collection(`users/${ uid }/posts`)
    .doc(pid)
    .delete();
};

export const editPost = async (uid, pid, description) => {
  await db
    .collection(`users/${ uid }/posts`)
    .doc(pid)
    .update({ description });
};

export const removeProjectPost = async (projectId, pid) => {
  await db
    .collection(`projects/${ projectId }/posts`)
    .doc(pid)
    .delete();
};

export const editProjectPost = async (projectId, pid, description) => {
  // console.log(pid);
  await db
    .collection(`projects/${ projectId }/posts`)
    .doc(pid)
    .update({ description });
};
