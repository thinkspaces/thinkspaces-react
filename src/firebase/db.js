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
   * @param {object} props : an object of properties to update with (low level)
   */
  update = async props => this.ref.update(props);

  /**
   * @param {object} props : an object of properties to create with (low level)
   */
  create = async props => this.ref.set(props, { merge: true });

  /**
   * static function (if not using an instance)
   * retrieve and return all buckets
   */
  static readAll = async () => {
    // get all the bucket docs
    const bucketQuery = await db.collection('tag-buckets').get();
    // if non empty
    if (bucketQuery && bucketQuery.docs) {
      // transform the query into actual data
      const bucketData = bucketQuery.docs.map(doc => (
        { id: doc.id,
          ...doc.data() }
      ));
      // compile all the tags
      const allTags = await Promise.all(
        // for each bucket
        bucketData.map(async (bucketDataItem) => {
          // get all the tag docs
          const query = await db
            .doc(`tag-buckets/${ bucketDataItem.id }`)
            .collection('tags')
            .get();
          // add the tags and construct a final bucket item
          return { ...bucketDataItem,
            tags: query.docs.map(doc => (
              { ...doc.data(),
                id: doc.id,
                ref: doc.ref }
            )) };
        }),
      );
      // return all the bucket items (this is an array)
      return allTags;
    }
    // if error
    return undefined;
  };

  /**
   * read single bucket
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
      id: bucketQuery.id,
      tags: tagsQuery.docs.map(doc => (
        { ...doc.data(), id: doc.id, ref: doc.ref }
      )) }
  };

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
   * @param {object} props : an object of properties to update with (low level)
   */
  update = async props => this.ref.update(props);

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
    return data;
  };

  /**
   * return tid of Tag document
   */
  id = () => this.ref.id;

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
   * @param {object} props : an object of properties to update with (low level)
   */
  update = async props => this.ref.update(props);

  /**
   * @param {object} props : an object of properties to create with (low level)
   */
  create = async props => this.ref.set(props, { merge: true });

  /**
   * return uid of document
   */
  id = () => this.ref.id;

  /**
   * returns one-level deep data of User as object
   */
  read = async () => {
    const query = await this.ref.get();
    const data = query.data();
    return data;
  };

  /**
   * a proxy for Tag().deleteUser()
   * @param {Tag} tagInstance : a Tag class object
   */
  deleteTag = async tagInstance => tagInstance.deleteUser(this)

  /**
   * a proxy for Tag().updateUser()
   * @param {Tag} tagInstance : a Tag class object
   */
  updateTag = async tagInstance => tagInstance.updateUser(this)
}

/**
 * Firebase Project interface
 */
export class Project {
  /**
   * construct a new Project object
   * @param {string} pid : unique user id OR
   * @param {DocumentReference} pDocRef : alternatively, just give the reference to the user
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
   * @param {object} props : an object of properties to update with (low level)
   */
  update = async props => this.ref.update(props);

  /**
   * @param {object} props : an object of properties to create with (low level)
   */
  create = async props => this.ref.set(props, { merge: true });

  /**
   * return pid of document
   */
  id = () => this.ref.id;

  /**
   * returns one-level deep data of Project as object
   */
  read = async () => {
    const query = await this.ref.get();
    const data = query.data();
    return data;
  };

  /**
   * helper function to retrieve and unpack tags for project
   */
  readTags = async () => {
    const data = await this.read()
    const tagsQuery = await Promise.all(data.tags.map(async tagRef => tagRef.get()))
    const tags = tagsQuery.map(snapshot => (
      { ...snapshot.data(), id: snapshot.id, ref: snapshot.ref }
    ))
    return tags
  }

  /**
   * helper function to drop all tags for a project
   * useful from a functional standpoint
   */
  deleteTags = async () => {
    // read the document
    const data = await this.read()
    // create Tag objects for each document
    const tags = data.tags.map(tag => new Tag(undefined, undefined, tag))
    // remove project for each tag
    tags.forEach((tag) => {
      tag.deleteProject(this)
    })
  }

  /**
   * a proxy for Tag().deleteProject()
   * @param {Tag} tagInstance : a Tag class object
   */
  deleteTag = async tagInstance => tagInstance.deleteProject(this)

  /**
   * a proxy for Tag().updateProject()
   * @param {Tag} tagInstance : a Tag class object
   */
  updateTag = async tagInstance => tagInstance.updateProject(this)
}
