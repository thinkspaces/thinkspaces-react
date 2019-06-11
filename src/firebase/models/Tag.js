import defaultsDeep from 'lodash/defaultsDeep';
import * as _shared from './shared';

// general CRUD stuff

/**
 * Creates a new document in the database.
 * @param {Object} props
 * @returns {String} New/created document id.
 */
export const create = (props) => {
  const newId = _shared.getNewId('tags');
  // eslint-disable-next-line object-curly-newline
  const finalProps = defaultsDeep(props, {
    name: '',
    type: '', // e.g. "location", "project-category", "organization", "release-status".
    // eslint-disable-next-line object-curly-newline
  });
  return _shared.create('tags', newId, finalProps);
};

/**
 *
 * @param {String} tagId
 * @returns {Object}
 */
export const get = tagId => _shared.get('tags', tagId);

/**
 *
 * @param {String} tagId
 * @param {Object} props
 */
export const update = (tagId, props) => _shared.update('tags', tagId, props);

/**
 * Deletes all tag assets and deletes database record.
 * @param {String} tagId
 */
export const destroy = tagId => _shared.destroy('tags', tagId);

// ready-made queries

/**
 * Get all tags of a particular type e.g. "release-status"
 * @param {String} type
 * @returns {Promise<Object>[]}
 */
export const getAll = (type = undefined) => {
  const query = _shared.constructQuery('tags');
  const filteredQuery = type ? query.where('type', '==', type) : query;
  return _shared.getFromQuery(filteredQuery);
};
