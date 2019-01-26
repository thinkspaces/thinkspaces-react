import { db, auth } from "./firebase";

export const getProjects = async () => {
  // create projects array
  let projects = [];

  // get collection reference (query snapshot)
  let snapshot = await db.collection("projects").get();

  // traverse snapshot for documents in collection, add to array
  snapshot.forEach(doc => {
    projects.push(doc.data());
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

export const getProfiles = async () => {
    let profiles = [];

    let snapshot = await db.collection("users").where("privacy", "==", false).get();
    snapshot.forEach(doc => {
        profiles.push(doc.data());
    });
}

export const createUserwithFields = async (
  uid,
  full_name,
  graduation,
  preferred_name,
  email,
  privacy
) => {
  await db
    .collection("users")
    .doc(uid)
    .set({
      full_name,
      preferred_name,
      graduation,
      email,
      privacy
    });
};

export const getUserProfile = async () => {
  let user = auth.currentUser;
  if (user) {
    let snapshot = await db
      .collection("users")
      .doc(user.uid)
      .get();
    return snapshot;
  } else return null;
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
// export const editUserOverview = async graduation => {
//   let user = auth.currentUser;
//   if (user) {
//     let profile = await db.collection("users").doc(user.uid);
//     db.runTransaction(function(transaction) {
//       return transaction.update(profile, { graduation: graduation });
//     });
//   }
// };

export const createProjectWithFields = async (
  title,
  contact,
  about,
  card_des,
  images,
  links,
  need
) => {
  // let user = auth.currentUser;E
  await db.collection("projects").add({
    title,
    contact,
    about,
    card_des,
    images,
    links,
    need
  });
};
