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

export const getProject = createAction('GET_PROJECT', async (pid) => {
  const response = await db.get('projects')(pid);
  return normalize(response, schema.project);
});

export const updateProject = createAction('UPDATE_PROJECT', async ({ pid, values }) => {
  await db.update('projects')(pid)(values);
  return normalize({ ...values }, schema.project);
});
