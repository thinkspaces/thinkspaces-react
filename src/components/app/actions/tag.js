import { normalize } from 'normalizr';
import { createAction } from 'redux-actions';

import { schema } from '../../../utils';
import { db, Project } from '../../../firebase';

export const getTags = createAction('GET_TAGS', async () => {
  const response = await db.getAll('tags');
  return normalize(response, [ schema.tag ]);
});

export const getTag = createAction('GET_TAG', async (tid) => {
  const response = await db.get('tags')(tid);
  return normalize(response, schema.tag);
});

export const updateTags = createAction('UPDATE_TAGS', async ({ pid, tags, type }) => {
  await Project.dropTags(pid)(type);
  await Promise.all(
    tags.map(async (tagId) => {
      await Project.updateFieldArrayWithId(db.add)('tags')(pid)(tagId);
    }),
  );

  return normalize({ id: pid, tags }, schema.project);
});
