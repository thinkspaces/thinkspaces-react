import defaultsDeep from 'lodash/defaultsDeep';
import { deleteProjectImages } from '../storage';
import * as _shared from './shared';

// identity management

export const getIdFromShortname = async (shortname) => {
  const query = _shared.constructQuery('projects').where('shortname', '==', shortname);
  const projects = await _shared.getFromQuery(query);
  if (projects.length !== 1) {
    return undefined;
  }
  return projects[0].id;
};

// general CRUD stuff

/**
 * Creates a new document in the database.
 * @param {Object} props
 * @returns {String} New/created document id.
 */
export const create = async (props) => {
  const newId = _shared.getNewId('projects');
  // eslint-disable-next-line object-curly-newline
  const finalProps = defaultsDeep(props, {
    shortname: newId, // can be changed later to a unique name
    name: '',
    description: '',
    logo: '', // URL
    images: [], // URLs
    links: [], // { name: '', URL: '', primary: bool }
    tags: [], // String[] ids
    team: [], // String[] ids
    admin: [], // String[] ids
    roles: [], // { compensation: '', meetings: '', description: '', title: '', etc. }
    privacy: { visibleInSearch: true },
    // eslint-disable-next-line object-curly-newline
  });
  return _shared.create('projects', newId, finalProps);
};

/**
 *
 * @param {String} projectId
 * @returns {Object}
 */
export const get = projectId => _shared.get('projects', projectId);

/**
 *
 * @param {String} projectId
 * @param {Object} props
 */
export const update = (projectId, props) => _shared.update('projects', projectId, props);

/**
 * Deletes all project assets and deletes database record.
 * @param {String} projectId
 */
export const destroy = async (projectId) => {
  await deleteProjectImages(projectId);
  return _shared.destroy('projects', projectId);
};

// tag management

/**
 * Retrieve all tags for a project.
 * @param {String} projectId
 * @param {String} type : Retrieve only tags of a certain type.
 */
export const getTags = async (projectId, type) => {
  const data = await get(projectId);
  const tags = await _shared.getFromIdsArray('tags', data.tags);
  if (type !== undefined) {
    return tags.filter(tag => tag.type === type);
  }
  return tags;
};

/**
 * Associate tag with project.
 * @param {String} projectId
 * @param {String} tagId
 */
export const addTag = (projectId, tagId) => _shared.addToSet('projects', projectId, 'tags', tagId);

/**
 * Dissociate tag with project.
 * @param {String} projectId
 * @param {String} tagId
 */
export const removeTag = (projectId, tagId) => _shared.removeFromSet('projects', projectId, 'tags', tagId);

/**
 * Drop all tags for the project, or some.
 * @param {String} projectId
 * @param {String} type : Drop only tags of this certain type.
 */
export const dropTags = async (projectId, type = undefined) => {
  // read the project
  const data = await get(projectId);
  // if no type specified, remove all tags
  if (type === undefined) {
    return update(projectId, { tags: [] });
  }
  // otherwise, remove only those tags belonging to the type
  const tags = await _shared.getFromIdsArray('tags', data.tags);
  const filteredTags = tags.filter(tag => tag.type !== type);
  return update(projectId, { tags: filteredTags.map(tag => tag.id) });
};

// team management

/**
 * Get team data for project.
 * @param {String} projectId
 * @returns {Promise<Object>[]}
 */
export const getTeam = async (projectId) => {
  const data = await get(projectId);
  return _shared.getFromIdsArray('users', data.team);
};

/**
 * Associate a user to a project.
 * @param {String} projectId
 * @param {String} userId
 */
export const addTeamUser = (projectId, userId) => _shared.addToSet('projects', projectId, 'team', userId);

/**
 * Dissociate a user to a project.
 * @param {String} projectId
 * @param {String} userId
 */
export const removeTeamUser = (projectId, userId) => _shared.removeFromSet('projects', projectId, 'team', userId);

/**
 * Drop the entire project team.
 * @param {String} projectId
 */
export const dropTeam = projectId => update(projectId, { team: [] });

// admin management

/**
 * Get admin data for project.
 * @param {String} projectId
 * @returns {Promise<Object>[]}
 */
export const getAdmin = async (projectId) => {
  const data = await get(projectId);
  return _shared.getFromIdsArray('users', data.admin);
};

/**
 * Associate a user as admin to a project.
 * @param {String} projectId
 * @param {String} userId
 */
export const addAdminUser = (projectId, userId) => _shared.addToSet('projects', projectId, 'admin', userId);

/**
 * Dissociate a user as admin to a project.
 * @param {String} projectId
 * @param {String} userId
 */
export const removeAdminUser = (projectId, userId) => _shared.removeFromSet('projects', projectId, 'admin', userId);

/**
 * Drop the entire project team.
 * @param {String} projectId
 */
export const dropAdmin = projectId => update(projectId, { admin: [] });
