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

export const saveProjectChanges = async (project, pid) => {
  const team = [];
  project.team.forEach((member) => {
    team.push(member.uid);
  });

  // project.team = team;

  // temporary fix to prevent EditProjectImages breaking
  delete project.images

  await db
    .collection('projects')
    .doc(pid)
    .update({ ...project, team });
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
    .set({ ...profileData, profilepicture: '', createdTimestamp: createTimestamp(new Date()) });
};

export const getUserProfile = async (uid) => {
  const snapshot = await db
    .collection('users')
    .doc(uid)
    .get();
  return snapshot;
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

export const createProfilePostWithFields = async (description, timestamp, uid) => {
  const docRef = await db
    .collection(`users/${ uid }/posts`)
    .add({ timestamp: createTimestamp(timestamp), description });
  return docRef.id;
};

export const createProjectPostWithFields = async (description, timestamp, projectId) => {
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
    posts.push({ description: doc.get('description'), timestamp, pid: doc.id });
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
    posts.push({ description: doc.get('description'), timestamp, pid: doc.id });
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

export const createProjectWithFields = async (project) => {
  const user = auth.currentUser;
  const projectRef = await db
    .collection('projects')
    .add({ ...project,
      team: [ user.uid ],
      owner: user.uid,
      likes: {},
      images: [],
      likesCount: 0,
      createdTimestamp: createTimestamp(new Date()) });
  return projectRef.id
};

export const setProjectImages = async (pid, imageURLs) => {
  await db.collection('projects')
    .doc(pid)
    .update({ images: imageURLs })
}

export const setProject = async (pid, obj) => {
  await db.collection('projects')
    .doc(pid)
    .set( obj, { merge: true })
}

export const getProject = async (pid) => {
  const docSnapshot = await db
    .collection('projects')
    .doc(pid)
    .get();
  const data = docSnapshot.data();
  return data
}
