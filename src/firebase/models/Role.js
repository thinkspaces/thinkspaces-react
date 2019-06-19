import defaultsDeep from 'lodash/defaultsDeep';
import * as _shared from './shared';

// general CRUD stuff

/**
 * Creates a new document in the database.
 * @param {Object} props
 * @returns {String} New/created document id.
 */
export const create = async (props) => {
  const newId = _shared.getNewId('roles');
  // eslint-disable-next-line object-curly-newline
  const finalProps = defaultsDeep(props, {
    postedBy: '', // ID of Project or Organization
    name: '', // e.g. Sales Intern
    // Markdown will help cater to a variety of requirements and is safer than
    // HTML. Although people will be able to type whatever they like, the UI
    // will cue them to separate their writing into logical sections. Links
    // and images will be embedded within the Markdown using some sort of
    // editor plugin
    description: '', // overview of the position in Markdown
    responsibilities: '', // specific responsibilities in Markdown
    more: '', // more content in Markdown
    isCompensated: true,
    hourRange: '', // how long they will work per week/day?
    dateRange: '', // start and end dates for work
    tags: [], // String[] ids
    // eslint-disable-next-line object-curly-newline
  });
  return _shared.create('roles', newId, finalProps);
};

/**
 *
 * @param {String} roleId
 * @returns {Object}
 */
export const get = roleId => _shared.get('roles', roleId);

/**
 * Get specific field from document (supports deep nesting).
 * @param {String} roleId
 * @param {String} fieldPath
 */
export const getField = async (roleId, fieldPath) => _shared.getField('roles', roleId, fieldPath);

/**
 *
 * @param {String} roleId
 * @param {Object} props
 */
export const update = (roleId, props) => _shared.update('roles', roleId, props);

/**
 * Deletes all role assets and deletes database record.
 * @param {String} roleId
 */
export const destroy = roleId => _shared.destroy('roles', roleId);

// tag management

/**
 * Retrieve all tags for a role.
 * @param {String} roleId
 * @param {String} type : Retrieve only tags of a certain type.
 */
export const getTags = (roleId, type) => _shared.getTags('roles', roleId, type);

/**
 * Associate tag with role.
 * @param {String} roleId
 * @param {String} tagId
 */
export const addTag = (roleId, tagId) => _shared.addTag('roles', roleId, tagId);

/**
 * Dissociate tag with role.
 * @param {String} roleId
 * @param {String} tagId
 */
export const removeTag = (roleId, tagId) => _shared.removeTag('roles', roleId, tagId);

/**
 * Drop all tags for the role, or some.
 * @param {String} roleId
 * @param {String} type : Drop only tags of this certain type.
 */
export const dropTags = (roleId, type = undefined) => _shared.dropTags('roles', roleId, type);
