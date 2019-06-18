import defaultsDeep from 'lodash/defaultsDeep';
import isNil from 'lodash/isNil';
import { db, createTimestamp, FieldValue } from '../firebase';

// identity management

/**
 *
 * @param {String} path : Path to collection e.g. tags
 */
export const getNewId = path => db.collection(path).doc().id;

/**
 * Get a Firebase Reference to a document inside a collection.
 * @param {String} path : Path to collection e.g. "tags".
 * @param {String} id : ID of document. Leave blank to generate a new one.
 */
export const getRefFromPathId = (path, id) => db.collection(path).doc(id);

/**
 *
 * @param {DocumentReference} ref : Firebase DocumentReference.
 * @returns {String}
 */
export const getIdFromRef = ref => ref.id;

// general CRUD

/**
 *
 * @param {String} path : Database table/collection.
 * @param {String} id : The ID of the document to create.
 * @param {Object} props : Properties.
 * @returns {String} New/created document id.
 */
export const create = async (path, id, props) => {
  const ref = getRefFromPathId(path, id);
  const finalProps = defaultsDeep(props, { createdTimestamp: createTimestamp(new Date()) });
  await ref.set(finalProps, { merge: true });
  return id;
};

/**
 *
 * @param {String} path : Database table/collection.
 * @param {String} id : The ID of the document.
 * @param {Object} props : Properties.
 * @returns {Promise}
 */
export const update = (path, id, props) => {
  const finalProps = defaultsDeep(props, { updatedTimestamp: createTimestamp(new Date()) });
  return getRefFromPathId(path, id).update(finalProps);
}

/**
 *
 * Destroys the document.
 * @param {String} path : Database table/collection.
 * @param {String} id : The ID of the document.
 * @returns {Promise}
 */
export const destroy = (path, id) => getRefFromPathId(path, id).delete();

/**
 *
 * Returns the data of the document.
 * @param {String} path : Database table/collection.
 * @param {String} id : The ID of the document.
 * @returns {Object}
 */
export const get = async (path, id) => {
  const documentSnapshot = await getRefFromPathId(path, id).get();
  return { ...documentSnapshot.data(), id };
};

/**
 * Resolves an array of IDs to data objects.
 * @param {String} path
 * @param {String[]} ids
 * @returns {Object[]}
 */
export const getFromIdsArray = (path, ids) => Promise.all(ids.map(async _id => get(path, _id)));

// query management

/**
 * Yields full control of the firebase reference for querying
 * @param {string} path : Path to a collection.
 * @returns {Query}
 */
export const constructQuery = path => db.collection(path);

/**
 *
 * @param {Query} query
 * @returns {Object[]}
 */
export const getFromQuery = async (query) => {
  const querySnapshot = await query.get();
  return querySnapshot.docs.map(queryDocumentSnapshot => ({ ...queryDocumentSnapshot.data(),
    id: queryDocumentSnapshot.id }));
};

// set operations

/**
 * @param {String} path
 * @param {String} id
 * @param {String} field
 * @param {Any} value
 * @returns {Promise}
 */
export const addToSet = (path, id, field, value) => update(path, id, { [field]: FieldValue.arrayUnion(value) });

/**
 *
 * @param {String} path
 * @param {String} id
 * @param {String} field
 * @param {Any} value
 * @returns {Promise}
 */
export const removeFromSet = (path, id, field, value) => update(path, id, { [field]: FieldValue.arrayRemove(value) });

// tag management

/**
 * Retrieve all tags for a document, irrespective of whether it has a tags field.
 * @param {String} path
 * @param {String} id
 * @param {String} type : Retrieve only tags of a certain type.
 */
export const getTags = async (path, id, type) => {
  const data = await get(path, id);
  if (isNil(data.tags)) {
    return [];
  }
  const tags = await getFromIdsArray('tags', data.tags);
  if (type !== undefined) {
    return tags.filter(tag => tag.type === type);
  }
  return tags;
};

/**
 * Associate tag with document, irrespective of whether it has a tags field.
 * @param {String} path
 * @param {String} id
 * @param {String} tagId
 */
export const addTag = (path, id, tagId) => addToSet(path, id, 'tags', tagId);

/**
 * Dissociate tag with document, irrespective of whether it has a tags field.
 * @param {String} path
 * @param {String} id
 * @param {String} tagId
 */
export const removeTag = (path, id, tagId) => removeFromSet(path, id, 'tags', tagId);

/**
 * Drop all tags for the document, or some, irrespective of whether it has a tags field.
 * @param {String} path
 * @param {String} id
 * @param {String} type : Drop only tags of this certain type.
 */
export const dropTags = async (path, id, type = undefined) => {
  // read the document
  const data = await get(path, id);
  if (isNil(data.tags)) {
    return [];
  }
  // if no type specified, remove all tags
  if (type === undefined) {
    return update(path, id, { tags: [] });
  }
  // otherwise, remove only those tags belonging to the type
  const tags = await getFromIdsArray('tags', data.tags);
  const filteredTags = tags.filter(tag => tag.type !== type);
  return update(path, id, { tags: filteredTags.map(tag => tag.id) });
};
