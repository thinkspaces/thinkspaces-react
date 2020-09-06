/* eslint import/no-cycle: 0 */
import { deleteProjectImages } from "../storage";
import {
  compose,
  getFieldArrayFromProject,
  getRefFromPath,
  deleteDocument,
  updateDocument,
  updateProps,
  appliedFilter,
  appliedMap,
  createDocument,
  constructQuery,
  formatProps,
} from "./shared";

import { get, update } from "./db";

/**
 * Default props that every Project should have
 */
const defaultProps = {
  shortname: "",
  name: "",
  description: "",
  images: [], // URLs
  links: [], // { name: '', URL: '', primary: bool }
  tags: [], // String[] ids
  team: [], // String[] ids
  admin: [], // String[] ids
  roles: [], // { compensation: '', meetings: '', description: '', title: '', etc. }
  privacy: false,
  likes: {},
  about: "",
  contact: "",
};

/**
 * Creates a project in the (projects) firestore collection, with supplied props
 * @param {JSON} props
 * @returns {String} Document ID
 */
export const create = (props) =>
  compose(
    (docRef) => updateDocument(docRef)({ shortname: docRef.id }),
    createDocument(formatProps(props, defaultProps)),
    constructQuery
  )("projects");

/**
 * Removes a project from (projects) firestore collection, and corresponding images
 * @param {String} projectId
 */
export const destroy = (projectId) =>
  compose(
    () => deleteDocument(getRefFromPath("projects")(projectId)),
    deleteProjectImages
  )(projectId);

/**
 * Gets all documents from a document's fieldArray referencing supplied collection
 */
export const getMembersFromFieldArray = (fieldArray) => (collection) => (
  projectId
) =>
  compose(
    appliedMap(get(collection)),
    getFieldArrayFromProject(fieldArray),
    get("projects")
  )(projectId);

/**
 * Removes all tags from project's tags fieldArray which do not match supplied type
 */
export const dropTags = (projectId) => (type) =>
  compose(
    (tags) => update("projects")(projectId)({ tags }),
    appliedMap((tag) => tag.id),
    appliedFilter((tag) => tag.type !== type),
    getMembersFromFieldArray("tags")("tags")
  )(projectId);

/**
 * Updates Project's fieldArray via supplied operation,
 * either addition or removal
 */
export const updateFieldArrayWithId = (operation) => (fieldArray) => (
  projectId
) => (targetId) =>
  compose(
    updateDocument(getRefFromPath("projects")(projectId)),
    updateProps
  )({ [fieldArray]: operation(targetId) });
