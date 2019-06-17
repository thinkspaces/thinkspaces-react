import defaultsDeep from 'lodash/defaultsDeep';
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
  // eslint-disable-next-line object-curly-newline
  const finalProps = defaultsDeep(props, {
    createdTimestamp: createTimestamp(new Date()),
    // eslint-disable-next-line object-curly-newline
  });
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
export const update = (path, id, props) => getRefFromPathId(path, id).update(props);

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
