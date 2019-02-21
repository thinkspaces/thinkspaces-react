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
  let projects = [];
  try {
    let querySnapshot = await db
      .collection("projects")
      .where("team", "array-contains", uid)
      .get();

    querySnapshot.forEach(doc => {
      // console.log(doc.get("title"));
      projects.push(doc.data());
    });
  } catch (error) {
    console.log("Unable to find projects via uid");
  }

  // let docRef = await db
  //   .collection("users")
  //   .doc("c34ednpglCg9J3mTWjtGHwwd6je2")
  //   .get();

  // console.log(docRef.data());
  console.log(projects);
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

export const getTopProjects = async () => {
  let projects = [];
  let snapshot = await db
    .collection("projects")
    .orderBy("likes", "desc")
    .limit(6)
    .get();
  console.log(snapshot);

  snapshot.forEach(doc => {
    console.log(doc.get("title"));
    projects.push({ ...doc.data(), id: doc.id });
  });
  return projects;
};

export const likeStatus = async id => {
  let snapshot = await db
    .collection("projects")
    .doc(id)
    .get();

  console.log(snapshot.data().likesID);
  return snapshot.data().likesID;
};

export const updateLikes = async (id, likesMap) => {
  console.log(id);
  await db
    .collection("projects")
    .doc(id)
    .update({
      likesID: likesMap
    });
};

export const updateLikesCount = async (id, num) => {
  let snapshot = await db
    .collection("projects")
    .doc(id)
    .get();
  let likesNum = snapshot.data().likes;
  console.log("this is likesNum", likesNum);
  await db
    .collection("projects")
    .doc(id)
    .update({
      likes: likesNum + num
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
