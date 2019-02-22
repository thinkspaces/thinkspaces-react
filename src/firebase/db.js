import { db, auth, createTimestamp } from './firebase';

export const getProjects = async () => {
  // create projects array
  const projects = [];

  // get collection reference (query snapshot)
  const snapshot = await db.collection('projects').get();

  // traverse snapshot for documents in collection, add to array
  snapshot.forEach((doc) => {
    projects.push({ ...doc.data(), id: doc.id });
  });

  return projects;
};

export const getMyProjects = async (uid) => {
  const projects = [];
  try {
    const querySnapshot = await db
      .collection('projects')
      .where('team', 'array-contains', uid)
      .get();

    querySnapshot.forEach((doc) => {
      projects.push({ ...doc.data(), id: doc.id });
    });
  } catch (error) {
    console.log('Unable to find projects via uid');
  }

  return projects;
};

export const getProfiles = async () => {
  const profiles = [];

  const snapshot = await db
    .collection('users')
    .where('privacy', '==', false)
    .get();

  snapshot.forEach((doc) => {
    profiles.push({ ...doc.data(), uid: doc.id });
  });

  return profiles;
};

export const getProjectByID = async (id) => {
  // grab data via id from firestore
  const docSnapshot = await db
    .collection('projects')
    .doc(id)
    .get();

  const data = docSnapshot.data();

  if (data.team) {
    // get names from team uids, add to data
    const members = [];
    await Promise.all(
      data.team.map(async (uid) => {
        const docRef = await db
          .collection('users')
          .doc(uid)
          .get();
        members.push({ uid, name: docRef.get('full_name') });
      }),
    );

    data.team = members;
  }
  return data;
};

export const getTopProjects = async () => {
  const projects = [];
  const snapshot = await db
    .collection('projects')
    .orderBy('likesCount', 'desc')
    .limit(6)
    .get();

  snapshot.forEach((doc) => {
    projects.push({ ...doc.data(), id: doc.id });
  });

  return projects;
};

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
    .set({ ...profileData, createdTimestamp: createTimestamp(new Date()) });
};

export const getUserProfile = async (uid) => {
  // let user = auth.currentUser;
  // if (user) {
  const snapshot = await db
    .collection('users')
    .doc(uid)
    .get();
  return snapshot;
  // } else return null;
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

export const saveProfilePicture = async (url) => {
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

export const createProfilePostWithFields = async (description, timestamp, uid) => {
  await db
    .collection(`users/${ uid }/posts`)
    .add({ timestamp: createTimestamp(timestamp), description });
};

export const getProfilePosts = async (uid) => {
  const posts = [];

  const querySnapshot = await db
    .collection(`users/${ uid }/posts`)
    .orderBy('timestamp', 'desc')
    .get();

  querySnapshot.forEach((doc) => {
    let timestamp = doc.get('timestamp');
    const date = timestamp.toDate();
    timestamp = `${ date.getMonth() }/${ date.getDate() }/${ date.getFullYear() }`;
    posts.push({ description: doc.get('description'), timestamp });
  });

  return posts;
};

export const createProjectWithFields = async (project) => {
  const user = auth.currentUser;
  await db
    .collection('projects')
    .add({ ...project, team: [ user.uid ], owner: user.uid, likes: {}, likesCount: 0 });
};
