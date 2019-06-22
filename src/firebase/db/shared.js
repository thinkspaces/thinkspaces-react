import { reduceRight, defaultsDeep, isNil } from 'lodash';
import { db, createTimestamp } from '../firebase';

/**
 * Composes from bottom to top all functions and resolves promises
 */
export const compose = (...fns) => input =>
  reduceRight(fns, (chain, func) => chain.then(func), Promise.resolve(input));

/**
 * Makes request to get data from Firestore for any given query reference
 * @param {QueryReference} query
 */
export const getSnapshotFromQuery = query => query.get();

/**
 * Packages Firestore Document into JSON with document data and id
 * @param {DocumentSnapshot} snapshot
 */
export const normalizeDocument = snapshot => ({ ...snapshot.data(), id: snapshot.id });

/**
 * Retrieves given array field from Firestore Document, handling empty case,
 * returns Array<Object>
 */
export const getFieldArrayFromProject = property => project =>
  (isNil(project[property]) ? [] : project[property]);

/**
 * Handles querysnapshot and supplies usable array
 * @param {QuerySnapshot} querySnapshot
 * @returns {Array<DocumentSnapshots>} querySnapshot
 */
export const getMatchedSnapshots = querySnapshot =>
  (!querySnapshot.empty ? querySnapshot.docs : []);

/**
 * Applies mapping function over collection resolving promises if any,
 * returns Array<Resolved Promises>
 */
export const appliedMap = fn => collection => Promise.all(collection.map(fn));

/**
 * Curried Filter, returns Array
 */
export const appliedFilter = fn => collection => collection.filter(fn);

/**
 * formats supplied props with Project defaults
 * @param {Object} props
 * @returns Formatted Props with timestamp
 */
export const formatProps = (...props) =>
  defaultsDeep(...props, { createdTimestamp: createTimestamp(new Date()) });

/**
 * constructs base query for firestore
 * @param {String} path
 * @returns QueryReference
 */
export const constructQuery = path => db.collection(path);

/**
 * Gets DocumentReference from path and id,
 */
export const getRefFromPath = path => id => db.collection(path).doc(id);

/**
 * Creates a firestore document with supplied props, merges if document exists,
 * returns VOID
 */
export const finalizeDocument = props => ref => ref.set(props, { merge: true });

/**
 * Creates a fresh firestore document with supplied props,
 * returns DocumentReference
 */
export const createDocument = props => ref => ref.add(props);

/**
 * Updates an existing document with props via DocumentReference,
 * returns Document ID: String
 */
export const updateDocument = ref => async (props) => {
  await ref.update(props);
  return ref.id;
};

/**
 * Deletes Document via DocumentReference
 */
export const deleteDocument = ref => ref.delete();

/**
 * Preps supplied props with timestamp update
 * @param {*} props
 * @returns Updated Props
 */
export const updateProps = props =>
  defaultsDeep(props, { updatedTimestamp: createTimestamp(new Date()) });

/**
 * Normalizes Document Snapshot into Timeline Post format
 * @param {DocumentSnapshot} snapshot
 * @returns JSON Post
 */
export const normalizePost = (snapshot) => {
  const date = snapshot.get('createdTimestamp').toDate();
  const timestamp = `${ date.getMonth() }/${ date.getDate() }/${ date.getFullYear() }`;
  return { description: snapshot.get('description'), timestamp, pid: snapshot.id };
};
