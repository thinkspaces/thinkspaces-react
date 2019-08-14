import { compose, formatProps, getRefFromPath, finalizeDocument } from './shared';

/**
 * Default props that every User Document should have
 */
const defaultProps = {
  username: '', // can be changed later to a unique name
  name: '',
  email: '',
  university: '',
  major: '',
  avatar: '', // URL
  headline: '', // short and simple
  description: '', // more text
  experience: [], // { name: '', image: '', description: '', startDate: '', endDate: '', },
  tags: [], // String[] ids
  privacy: false,
  interests: '',
  skills: '',
  courses: '',
};

/**
 * Creates a User in the (users) firestore collection, with supplied props and generated user ID
 */
const create = userId => props =>
  compose(
    finalizeDocument(formatProps({ username: userId }, props, defaultProps)),
    getRefFromPath('users'),
  )(userId);

export default { create };
