import defaultsDeep from 'lodash/defaultsDeep';
import * as _shared from './shared';

// identity management

export const getIdFromUsername = async (username) => {
  const query = _shared.constructQuery('users').where('username', '==', username);
  const users = await _shared.getFromQuery(query);
  if (users.length !== 1) {
    return undefined;
  }
  return users[0].id;
};

// general CRUD stuff

/**
 * Creates a new document in the database.
 * @param {Object} props
 * @returns {String} New/created document id.
 */
export const create = (props) => {
  const newId = _shared.getNewId('users');
  // eslint-disable-next-line object-curly-newline
  const finalProps = defaultsDeep(props, {
    username: newId, // can be changed later to a unique name
    name: '',
    avatar: '', // URL
    headline: '', // short and simple
    description: '', // more text
    experience: [], // { name: '', image: '', description: '', startDate: '', endDate: '', },
    tags: [], // String[] ids
    privacy: { visibleInSearch: true },
    // eslint-disable-next-line object-curly-newline
  });
  return _shared.create('users', newId, finalProps);
};

/**
 *
 * @param {String} userId
 * @returns {Object}
 */
export const get = userId => _shared.get('users', userId);

/**
 * Get specific field from document (supports deep nesting).
 * @param {String} userId
 * @param {String} fieldPath
 */
export const getField = async (userId, fieldPath) => _shared.getField('users', userId, fieldPath);

/**
 *
 * @param {String} userId
 * @param {Object} props
 */
export const update = (userId, props) => _shared.update('users', userId, props);

/**
 * Deletes all tag assets and deletes database record.
 * @param {String} userId
 */
export const destroy = userId => _shared.destroy('users', userId);

// tag management

/**
 * Retrieve all tags for a user.
 * @param {String} userId
 * @param {String} type : Retrieve only tags of a certain type.
 */
export const getTags = (userId, type) => _shared.getTags('users', userId, type);

/**
 * Associate tag with user.
 * @param {String} userId
 * @param {String} tagId
 */
export const addTag = (userId, tagId) => _shared.addTag('users', userId, tagId);

/**
 * Dissociate tag with user.
 * @param {String} userId
 * @param {String} tagId
 */
export const removeTag = (userId, tagId) => _shared.removeTag('users', userId, tagId);

/**
 * Drop all tags for the user, or some.
 * @param {String} userId
 * @param {String} type : Drop only tags of this certain type.
 */
export const dropTags = (userId, type = undefined) => _shared.dropTags('users', userId, type);

// project management

/**
 * Retrieve all projects of which the user is a team member.
 * @param {String} userId
 */
export const getProjectsWithUserInTeam = (userId) => {
  const query = _shared.constructQuery('projects').where('team', 'array-contains', userId)
  return _shared.getFromQuery(query)
}

/**
 * Retrieve all projects of which the user is an administrator.
 * @param {String} userId
 */
export const getProjectsWithUserInAdmin = (userId) => {
  const query = _shared.constructQuery('projects').where('admin', 'array-contains', userId)
  return _shared.getFromQuery(query)
}

/**
 * Retrieve all projects with which the user is associated.
 * @param {String} userId
 */
export const getProjects = async (userId) => {
  const teams = await getProjectsWithUserInTeam(userId)
  const admin = await getProjectsWithUserInAdmin(userId)
  return [ ...teams, ...admin ]
}

// reputation management

/**
 * Upvotes project on behalf of user and tracks changes.
 * @param {String} userId
 * @param {String} projectId
 */
export const upvoteProject = async (userId, projectId) => {
  const upvotedProjects = await getField(userId, 'upvotedProjects')
  if (upvotedProjects && upvotedProjects.includes(projectId)) { return false }
  await _shared.addToSet('users', userId, 'upvotedProjects', projectId)
  await _shared.upvote('projects', projectId)
  return true
}

/**
 * Downvotes project on behalf of user and tracks changes.
 * @param {String} userId
 * @param {String} projectId
 */
export const downvoteProject = async (userId, projectId) => {
  const upvotedProjects = await getField(userId, 'upvotedProjects')
  if (upvotedProjects && upvotedProjects.includes(projectId)) {
    await _shared.removeFromSet('users', userId, 'upvotedProjects', projectId)
    await _shared.downvote('projects', projectId)
    return true
  }
  return false
}

/**
 * Upvotes user on behalf of user and tracks changes.
 * @param {String} userId
 * @param {String} receivingUserId
 */
export const upvoteUser = async (userId, receivingUserId) => {
  const upvotedUsers = await getField(userId, 'upvotedUsers')
  if (upvotedUsers && upvotedUsers.includes(receivingUserId)) { return false }
  await _shared.addToSet('users', userId, 'upvotedUsers', receivingUserId)
  await _shared.upvote('users', receivingUserId)
  return true
}

/**
 * Downvotes user on behalf of user and tracks changes.
 * @param {String} userId
 * @param {String} receivingUserId
 */
export const downvoteUser = async (userId, receivingUserId) => {
  const upvotedUsers = await getField(userId, 'upvotedUsers')
  if (upvotedUsers && upvotedUsers.includes(receivingUserId)) {
    await _shared.removeFromSet('users', userId, 'upvotedUsers', receivingUserId)
    await _shared.downvote('users', receivingUserId)
    return true
  }
  return false
}
