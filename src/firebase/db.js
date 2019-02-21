import { db, auth, createTimestamp } from "./firebase";

export const getProjects = async () => {
  // create projects array
  let projects = [];

  // get collection reference (query snapshot)
  let snapshot = await db.collection("projects").get();

  // traverse snapshot for documents in collection, add to array
  snapshot.forEach(doc => {
    projects.push({ ...doc.data(), id: doc.id });
  });

  return projects;
};

export const getMyProjects = async uid => {
  let projects = [];
  try {
    let querySnapshot = await db
      .collection("projects")
      .where("team", "array-contains", uid)
      .get();

    querySnapshot.forEach(doc => {
      projects.push({ ...doc.data(), id: doc.id });
    });
  } catch (error) {
    console.log("Unable to find projects via uid");
  }

  return projects;
};

export const getProfiles = async () => {
  let profiles = [];

  let snapshot = await db
    .collection("users")
    .where("privacy", "==", false)
    .get();

  snapshot.forEach(doc => {
    profiles.push({ ...doc.data(), uid: doc.id });
  });

  return profiles;
};

export const getProjectByID = async id => {
  //grab data via id from firestore
  let docSnapshot = await db
    .collection("projects")
    .doc(id)
    .get();

  let data = docSnapshot.data();

  if (data.team) {
    //get names from team uids, add to data
    let members = [];
    await Promise.all(
      data.team.map(async uid => {
        let docRef = await db
          .collection("users")
          .doc(uid)
          .get();
        members.push({ uid, name: docRef.get("full_name") });
      })
    );

    data.team = members;
  }
  return data;
};

export const projectLikes = async (id, likes) => {
  await db
    .collection("projects")
    .doc(id)
    .update({
      likes: likes + 1
    });
};

export const getProjectLikes = async id => {
  let doc = await db
    .collection("projects")
    .doc(id)
    .get();
  if (doc.exists) {
    return doc.get("likesID").size;
  } else return 0;
};

//likes (map) will already be modified from application level
export const setProjectLikes = async (id, likes) => {
  await db
    .collection("projects")
    .doc(id)
    .update({
      likes
    });
};

export const createUserwithFields = async (uid, profileData) => {
  await db
    .collection("users")
    .doc(uid)
    .set({
      ...profileData,
      createdTimestamp : createTimestamp(new Date())
    });
};

export const getUserProfile = async uid => {
  // let user = auth.currentUser;
  // if (user) {
  let snapshot = await db
    .collection("users")
    .doc(uid)
    .get();
  return snapshot;
  // } else return null;
};

//how to determine what data to set and what to add
export const saveProfileChanges = async profile => {
  let user = auth.currentUser;
  if (user) {
    await db
      .collection("users")
      .doc(user.uid)
      .update({
        ...profile
      });
  }
};

export const saveProfilePicture = async url => {
  let user = auth.currentUser;
  if (user) {
    await db
      .collection("users")
      .doc(user.uid)
      .update({
        profilepicture: url
      });
  }
};

export const saveProjectPicture = async (id, url) => {
  await db
    .collection("projects")
    .doc(id)
    .update({ images: [url] });
};

export const createProfilePostWithFields = async (
  description,
  timestamp,
  uid
) =>
  await db.collection(`users/${uid}/posts`).add({
    timestamp: createTimestamp(timestamp),
    description
  });

export const getProfilePosts = async uid => {
  let posts = [];

  let querySnapshot = await db
    .collection(`users/${uid}/posts`)
    .orderBy("timestamp", "desc")
    .get();

  querySnapshot.forEach(doc => {
    let timestamp = doc.get("timestamp");
    let date = timestamp.toDate();
    timestamp = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    posts.push({ description: doc.get("description"), timestamp });
  });

  return posts;
};

export const createProjectWithFields = async project => {
  let user = auth.currentUser;
  let doc = await getUserProfile(user.uid);
  let name = doc.get("full_name");

  await db.collection("projects").add({
    ...project,
    team: [{ name, uid: user.uid }]
  });
};
