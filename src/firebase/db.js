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

  // db.collection('projects').get().then((snapshot) => {
  //     snapshot.forEach((doc => {
  //         projects.push(doc.data());
  //
  //         this.setState({ projects });
  //         // console.log(doc.data());
  //     }))
  // });
};

export const getMyProjects = async uid => {
  // console.log(auid);
  let projects = [];
  let querySnapshot = await db
    .collection("projects")
    .where("team.owner.uid", "==", uid)
    .get();

  querySnapshot.forEach(doc => {
    console.log(doc.data());
  });
  // console.log(snapshot);
  //   .then(function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //       projects.push({ ...doc.data(), id: doc.id });
  //     });
  //   });
  // console.log(projects);
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
  let snapshot = await db
    .collection("projects")
    .doc(id)
    .get();
  return snapshot;
};

export const projectLikes = async (id, likes) => {
  //var likeNumber = db.collection("projects").doc(id).get("likes");
  await db
    .collection("projects")
    .doc(id)
    .update({
      likes: likes + 1
    });
};
export const getProjectLikes = async id => {
  var docRef = db.collection("projects").doc(id);
  docRef.get().then(function(doc) {
    if (doc.exists) {
      return doc.data().likes;
    }
  });
};

export const createUserwithFields = async (uid, profileData) => {
  await db
    .collection("users")
    .doc(uid)
    .set({
      ...profileData
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
) => {
  let docRef = await db
    .collection("users")
    .doc(uid)
    .collection("posts")
    .add({
      timestamp: createTimestamp(timestamp),
      description
    });
  await docRef.update({
    pid: docRef.id
  });
};

// export const getProfilePosts = async(id) => {
//     let posts = [];
//
//     let snapshot = await db
//         .collection("users")
//         .doc(id)
//         .collection("posts")
//         .doc(id)
//         .get();
//
//       snapshot.forEach(doc => {
//         posts.push({ ...doc.data() });
//       });
//
//     return posts;
// }

export const createProjectWithFields = async project => {
  let user = auth.currentUser;
  let doc = await getUserProfile(user.uid);
  let name = doc.get("full_name");

  await db.collection("projects").add({
    ...project,
    team: [{ name, uid: user.uid }]
  });
};
