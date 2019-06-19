import defaultsDeep from 'lodash/defaultsDeep';
import isNil from 'lodash/isNil';

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
 * Get specific field from document (supports deep nesting).
 * @param {String} projectId
 * @param {String} fieldPath
 */
export const getField = async (projectId, fieldPath) => _shared.getField('projects', projectId, fieldPath);

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
export const getTags = (projectId, type) => _shared.getTags('projects', projectId, type);

/**
 * Associate tag with project.
 * @param {String} projectId
 * @param {String} tagId
 */
export const addTag = (projectId, tagId) => _shared.addTag('projects', projectId, tagId);

/**
 * Dissociate tag with project.
 * @param {String} projectId
 * @param {String} tagId
 */
export const removeTag = (projectId, tagId) => _shared.removeTag('projects', projectId, tagId);

/**
 * Drop all tags for the project, or some.
 * @param {String} projectId
 * @param {String} type : Drop only tags of this certain type.
 */
export const dropTags = (projectId, type = undefined) => _shared.dropTags('projects', projectId, type);

// team management

/**
 * Get team data for project.
 * @param {String} projectId
 * @returns {Promise<Object>[]}
 */
export const getTeam = async (projectId) => {
  const data = await get(projectId);
  if (isNil(data.team)) {
    return [];
  }
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
  if (isNil(data.admin)) {
    return [];
  }
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

// role management

/**
 * Associate a role with a project.
 * @param {String} projectId
 * @param {String} roleId
 */
export const addRole = (projectId, roleId) => _shared.addToSet('projects', projectId, 'roles', roleId);

/**
 * Dissociate a role with a project.
 * @param {String} projectId
 * @param {String} roleId
 */
export const removeRole = (projectId, roleId) => _shared.removeFromSet('projects', projectId, 'roles', roleId);
