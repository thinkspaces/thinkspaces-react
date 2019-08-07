import { normalize } from 'normalizr';
import { createAction } from 'redux-actions';

import { schema } from '../../../utils';
import { db } from '../../../firebase';

export const getTags = createAction('GET_TAGS', async () => {
  const response = await db.getAll('tags');
  return normalize(response, [ schema.tag ]);
});
