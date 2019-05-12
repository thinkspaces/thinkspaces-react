/* eslint-disable no-use-before-define */
import idx from 'idx'
import { db, auth, createTimestamp, FieldValue } from './firebase';

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
  delete project.images;

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

  //   if (data.team) {
  //     // get names from team uids, add to data
  //     const members = [];
  //     await Promise.all(
  //       data.team.map(async (uid) => {
  //         const docRef = await db
  //           .collection('users')
  //           .doc(uid)
  //           .get();
  //         members.push({ uid, name: docRef.get('full_name') });
  //       }),
  //     );

  //     // data.team = members;
  //   }
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
    .set({ ...profileData,
      profilepicture: '',
      createdTimestamp: createTimestamp(new Date()) });
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
  return projectRef.id;
};

export const setProjectImages = async (pid, imageURLs) => {
  await db
    .collection('projects')
    .doc(pid)
    .update({ images: imageURLs });
};

export const setProject = async (pid, obj) => {
  await db
    .collection('projects')
    .doc(pid)
    .set(obj, { merge: true });
};

export const getProject = async (pid) => {
  const docSnapshot = await db
    .collection('projects')
    .doc(pid)
    .get();
  const data = docSnapshot.data();
  return data;
};

/**
 * Firebase Tag Bucket interface
 */
export class TagBucket {
  /**
   * use either parameter to construct a TagBucket object
   * @param {string} tbid : e.g. tag-buckets/location
   * @param {DocumentReference} tbDocRef :
   */
  constructor(tbid = undefined, tbDocRef = undefined) {
    if (tbDocRef === undefined) {
      if (tbid === undefined) {
        // from new
        this.ref = db.collection('tag-buckets').doc();
      } else {
        // from existing id
        this.ref = db.collection('tag-buckets').doc(tbid);
      }
    } else {
      // from existing reference
      this.ref = tbDocRef;
    }
  }

  /**
   * @param {object} props : an object of properties to create with (low level)
   */
  create = async props => this.ref.set(props, { merge: true });

  /**
   * read single bucket one level deep
   */
  read = async () => {
    // retrieve doc from reference
    const bucketQuery = await this.ref.get();
    // access data of retrieved doc
    const bucketData = bucketQuery.data();
    // retrieve subcollection doc
    const tagsQuery = await this.ref.collection('tags').get();
    // add subcollection data to existing
    return { ...bucketData,
      id: this.id(),
      ref: this.ref,
      tags: tagsQuery.docs.map(snapshot => snapshot.ref) }
  };

  /**
   * helper function to retrieve and unpack tags for bucket
   */
  readTags = async () => {
    const data = await this.read()
    const tags = await Promise.all(
      data.tags.map(async docRef => (new Tag(undefined, undefined, docRef)).read()),
    )
    return tags
  }

  /**
   * @param {object} props : an object of properties to update with (low level)
   */
  update = async props => this.ref.update(props);

  /**
   * return tbid of tag bucket
   */
  id = () => this.ref.id;
}

/**
 * Firebase Tag interface
 */
export class Tag {
  /**
   * construct a new Tag object
   * @param {string} tbid : the tag bucket id e.g. "organization"
   * @param {string} tid  : the tag id e.g. "startup"
   * @param {DocumentReference} tDocRef : alternatively, just give the reference to the tag
   */
  constructor(tbid = undefined, tid = undefined, tDocRef = undefined) {
    if (tDocRef === undefined) {
      if (tbid === undefined || tid === undefined) {
        // from new
        this.ref = db.collection('tag-buckets').doc('miscellaneous').collection('tags').doc();
      } else {
        // from existing id
        this.ref = db.collection('tag-buckets').doc(tbid).collection('tags').doc(tid);
      }
    } else {
      // from existing reference
      this.ref = tDocRef;
    }
  }

  /**
   * @param {object} props : an object of properties to create with (low level)
   */
  create = async props => this.ref.set(props, { merge: true });

  /**
   * returns one-level deep data of Tag as object
   */
  read = async () => {
    const query = await this.ref.get();
    const data = query.data();
    return { ...data,
      id: this.id(),
      ref: this.ref };
  };

  /**
   * @param {object} props : an object of properties to update with (low level)
   */
  update = async props => this.ref.update(props);

  /**
   * helper function to add a new user to the tag's user array
   * @param {User} userInstance : User class object
   */
  updateUser = async (userInstance) => {
    try {
      // add to tag's user array
      await this.update({ users: FieldValue.arrayUnion(userInstance.ref) });
      // add to user's tag array
      await userInstance.update({ tags: FieldValue.arrayUnion(this.ref) });
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * helper function to add a new project to the tag's project array
   * @param {Project} projectInstance : Project class object
   */
  updateProject = async (projectInstance) => {
    try {
      // add to tag's project array
      await this.update({ projects: FieldValue.arrayUnion(projectInstance.ref) });
      // add to project's tag array
      await projectInstance.update({ tags: FieldValue.arrayUnion(this.ref) });
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * helper function to remove a new user from the tag's user array
   * @param {User} userInstance : User class object
   */
  deleteUser = async (userInstance) => {
    try {
      // remove user from tag's user array
      await this.update({ users: FieldValue.arrayRemove(userInstance.ref) });
      // remove tag from user's tag array
      await userInstance.update({ tags: FieldValue.arrayRemove(this.ref) });
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * helper function to remove a new project from the tag's project array
   * @param {Project} projectInstance : Project class object
   */
  deleteProject = async (projectInstance) => {
    try {
      // remove project from tag's project array
      await this.update({ projects: FieldValue.arrayRemove(projectInstance.ref) });
      // remove tag from project's tag array
      await projectInstance.update({ tags: FieldValue.arrayRemove(this.ref) });
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * return tid of Tag document
   */
  id = () => this.ref.id;
}

/**
 * Firebase User interface
 */
export class User {
  /**
   * construct a new User object
   * @param {string} uid : unique user id OR
   * @param {DocumentReference} uDocRef : alternatively, just give the reference to the user
   */
  constructor(uid = undefined, uDocRef = undefined) {
    if (uDocRef === undefined) {
      if (uid === undefined) {
        // from new
        this.ref = db.collection('users').doc();
      } else {
        // from existing id
        this.ref = db.collection('users').doc(uid);
      }
    } else {
      // from existing reference
      this.ref = uDocRef;
    }
  }

  /**
   * @param {object} props : an object of properties to create with (low level)
   */
  create = async props => this.ref.set(props, { merge: true });

  /**
   * returns one-level deep data of User as object
   */
  read = async () => {
    const query = await this.ref.get();
    const data = query.data();
    return { ...data,
      id: this.id(),
      ref: this.ref }
  };

  /**
   *
   * @param {string} field : e.g. username
   * @param {string} comparator : e.g. ==, <=
   * @param {any} value : what to check for
   */
  static read = async (field, comparator, value) => {
    const query = db.collection('users').where(field, comparator, value)
    const querySnapshot = await query.get()
    const users = querySnapshot.docs.map(queryDocumentSnapshot => (
      { ...queryDocumentSnapshot.data(),
        id: queryDocumentSnapshot.id,
        ref: queryDocumentSnapshot.ref }
    ))
    return users
  }

  /**
   * @param {object} props : an object of properties to update with (low level)
   */
  update = async props => this.ref.update(props);

  /**
   * a proxy for Tag().updateUser()
   * @param {Tag} tagInstance : a Tag class object
   */
  updateTag = async tagInstance => tagInstance.updateUser(this)

  /**
   * a proxy for Project().updateTeamUser()
   * team members can edit project details
   * @param {Project} projectInstance : a Project class object
   */
  updateTeam = async projectInstance => projectInstance.updateTeamUser(this)

  /**
   * a proxy for Tag().deleteUser()
   * @param {Tag} tagInstance : a Tag class object
   */
  deleteTag = async tagInstance => tagInstance.deleteUser(this)

  /**
   * a proxy for Project().deleteTeamUser()
   * @param {Project} projectInstance : a Project class object
   */
  deleteTeam = async projectInstance => projectInstance.deleteTeamUser(this)

  /**
   * return uid of document
   */
  id = () => this.ref.id;
}

/**
 * Firebase Project interface
 */
export class Project {
  /**
   * construct a new Project object
   * @param {string} pid : unique user id OR
   * @param {DocumentReference} pDocRef : alternatively, just give the reference to the project
   */
  constructor(pid = undefined, pDocRef = undefined) {
    if (pDocRef === undefined) {
      if (pid === undefined) {
        // from new
        this.ref = db.collection('projects').doc();
      } else {
        // from existing id
        this.ref = db.collection('projects').doc(pid);
      }
    } else {
      // from existing reference
      this.ref = pDocRef;
    }
  }

  /**
   * @param {object} props : an object of properties to create with (low level)
   */
  create = async props => this.ref.set(props, { merge: true });

  /**
   * returns one-level deep data of Project as object
   */
  read = async () => {
    const query = await this.ref.get();
    const data = query.data();
    return { ...data,
      id: this.id(),
      ref: this.ref }
  };

  /**
   * helper function to retrieve and unpack tags for project
   */
  readTags = async () => {
    const data = await this.read()
    // check if nested field is defined (edge case)
    const tagRefs = idx(data, obj => obj.tags)
    if (tagRefs === undefined) { return [] }
    // create Tag objects
    const tags = await Promise.all(
      tagRefs.map(async docRef => new Tag(undefined, undefined, docRef).read()),
    );
    return tags
  }

  /**
   * returns team members of project by unpacking each User reference
   */
  readTeam = async () => {
    const query = await this.ref.get();
    const data = query.data();
    const teamRefs = idx(data, obj => obj.team)
    if (teamRefs === undefined) { return [] }
    const team = await Promise.all(
      teamRefs.map(async docRef => (new User(undefined, docRef)).read()),
    )
    return team
  };

  /**
   * @param {object} props : an object of properties to update with (low level)
   */
  update = async props => this.ref.update(props);

  /**
   * a proxy for Tag().updateProject()
   * @param {Tag} tagInstance : a Tag class object
   */
  updateTag = async tagInstance => tagInstance.updateProject(this)

  /**
   * add a User to a Project's team
   * team members can edit project details
   * @param {Tag} userInstance : a User class object
   */
  updateTeamUser = async (userInstance) => {
    try {
      // add to tag's team array
      await this.update({ team: FieldValue.arrayUnion(userInstance.ref) });
      // add project to the user's teams array
      await userInstance.update({ teams: FieldValue.arrayUnion(this.ref) });
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * a proxy for Tag().deleteProject()
   * @param {Tag} tagInstance : a Tag class object
   */
  deleteTag = async tagInstance => tagInstance.deleteProject(this)

  /**
   * helper function to drop all tags for a project
   * useful from a functional standpoint
   */
  deleteTags = async () => {
    // read the document
    const data = await this.read()
    // check if nested field is defined (edge case)
    const tagRefs = idx(data, obj => obj.tags)
    if (tagRefs === undefined) { return [] }
    // create Tag objects for each document
    const tags = tagRefs.map(docRef => new Tag(undefined, undefined, docRef))
    // remove project for each tag
    return tags.forEach(tag => tag.deleteProject(this) )
  }

  /**
   * helper function to drop all users for a project team
   * useful from a functional standpoint
   */
  deleteTeam = async () => {
    // read the document
    const data = await this.read()
    // check if nested field is defined (edge case)
    const teamRefs = idx(data, obj => obj.team)
    if (teamRefs === undefined) { return [] }
    // remove project for each tag
    return teamRefs.map(async docRef => this.deleteTeamUser(new User(undefined, docRef)))
  }

  /**
   * remove a user from a project's team array
   * @param {User} userInstance : a User class object
   */
  deleteTeamUser = async (userInstance) => {
    try {
      // remove user from project's team array
      await this.update({ team: FieldValue.arrayRemove(userInstance.ref) });
      // remove project from user's teams array
      await userInstance.update({ teams: FieldValue.arrayRemove(this.ref) });
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * return pid of document
   */
  id = () => this.ref.id;
}
