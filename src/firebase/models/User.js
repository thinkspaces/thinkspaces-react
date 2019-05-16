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
export const getTags = async (userId, type) => {
  const data = await get(userId);
  const tags = await _shared.getFromIdsArray(data.tags);
  // filter if necessary
  if (type !== undefined) {
    return tags.filter(tag => tag.type === type);
  }
  return tags;
};

/**
 * Associate tag with user.
 * @param {String} userId
 * @param {String} tagId
 */
export const addTag = (userId, tagId) => _shared.addToSet('users', userId, 'tags', tagId);

/**
 * Dissociate tag with user.
 * @param {String} userId
 * @param {String} tagId
 */
export const removeTag = (userId, tagId) => _shared.removeFromSet('users', userId, 'tags', tagId);

/**
 * Drop all tags for the user, or some.
 * @param {String} userId
 * @param {String} type : Drop only tags of this certain type.
 */
export const dropTags = async (userId, type = undefined) => {
  const data = await get(userId);
  // if no type, then remove all tags
  if (type === undefined) {
    return update(userId, { tags: [] });
  }
  // otherwise remove only a subset of tags
  const tags = await _shared.getFromIdsArray(data.tags);
  const filteredTags = tags.filter(tag => tag.type !== type);
  return update(userId, { tags: filteredTags.map(tag => tag.id) });
};