import { normalize } from 'normalizr';
import { createAction } from 'redux-actions';
import { schema } from '../../../utils';
import { db, Project } from '../../../firebase';

export const createProject = createAction('CREATE_PROJECT', async (values) => {
  const response = await Project.create(values);
  return response;
});

export const getProjects = createAction('GET_PROJECTS', async () => {
  const response = await db.getAll('projects');
  return normalize(response, [ schema.project ]);
});
