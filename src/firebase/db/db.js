import {
  compose,
  normalizeDocument,
  getSnapshotFromQuery,
  getRefFromPath,
  appliedMap,
  getMatchedSnapshots,
  constructQuery,
  updateDocument,
  updateProps,
  normalizePost,
  createDocument,
  deleteDocument,
  formatProps,
} from './shared';

import { FieldValue } from '../firebase';

/**
 * Gets and Normalizes Document Data from a Firestore collection, returns JSON
 *
 * examples)
 * db.get('projects')(pid)
 * db.get('users')(uid)
 * db.get('tags')(tid)
 */

export const get = collection => documentId =>
  compose(
    normalizeDocument,
    getSnapshotFromQuery,
    getRefFromPath(collection),
  )(documentId);

/**
 * Gets all Documents from a Firestore collection and normalizes each one, returned as Array<Object>
 */
export const getAll = collection =>
  compose(
    appliedMap(normalizeDocument),
    getMatchedSnapshots,
    getSnapshotFromQuery,
    constructQuery,
  )(collection);

/**
 * Gets all documents from a collection with match any/all conditions supplied,
 * documents are normalized and returned as Array<Object>
 */
export const getAllByFilter = collection => (...conditions) =>
  compose(
    appliedMap(normalizeDocument),
    getMatchedSnapshots,
    getSnapshotFromQuery,
    compose(...conditions),
    constructQuery,
  )(collection);

/**
 * Updates a document in a firestore collection, with the supplied props,
 * returns Document ID: String
 *
 * examples)
 * update('users')(uid)({ name });
 * update('projects')(pid)({ name, description });
 */
export const update = collection => documentId => props =>
  compose(
    updateDocument(getRefFromPath(collection)(documentId)),
    updateProps,
  )(props);

/* MUTATING OPERATIONS FOR FIELD ARRAYS */
/**
 * Wrapper for appending items to FieldArrays in Firestore Documents
 */
export const add = FieldValue.arrayUnion;

/**
 * Wrapper for removing items from FieldArrays in Firestore Documents
 */
export const remove = FieldValue.arrayRemove;

/* QUERY CONDITIONS FUNCTIONS */
/**
 * Applies where operation to a firestore collection reference query,
 * returns modified query: CollectionReference
 */
export const where = fieldPath => comparison => filter => query =>
  query.where(fieldPath, comparison, filter);

/**
 * Applies orderby operation to a firestore collection reference query,
 * returns modified query: CollectionReference
 */
export const orderBy = fieldPath => direction => query => query.orderBy(fieldPath, direction);

/**
 * Applies limit operation to a firestore collection reference query,
 * returns modified query: CollectionReference
 */
export const limit = number => query => query.limit(number);

/* POSTS FUNCTIONS */
/**
 * Gets and normalizes all posts from a document's (posts) subcollection,
 * returns an Array<Object> where each object is a normalized post
 */
export const getPosts = collection => documentId =>
  compose(
    appliedMap(normalizePost),
    getMatchedSnapshots,
    getSnapshotFromQuery,
    orderBy('createdTimestamp')('asc'),
    constructQuery,
  )(`${ collection }/${ documentId }/posts`);

/**
 * Creates a post at document's (posts) subcollection, with supplied description,
 * will generate a timestamp field upon execution,
 * returns a normalized Post: JSON Object
 */
export const createPost = collection => documentId => description =>
  compose(
    normalizePost,
    getSnapshotFromQuery,
    createDocument(formatProps({ description })),
    constructQuery,
  )(`${ collection }/${ documentId }/posts`);

/**
 * Removes a post from a document's (posts) subcollection
 */
export const removePost = collection => documentId => postId =>
  deleteDocument(getRefFromPath(`${ collection }/${ documentId }/posts`)(postId));

/**
 * Edits a post from a document's (posts) subcollection, with supplied description
 */
export const editPost = collection => documentId => postId => description =>
  update(`${ collection }/${ documentId }/posts`)(postId)({ description });
