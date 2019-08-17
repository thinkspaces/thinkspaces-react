import { normalize } from 'normalizr';
import { createAction } from 'redux-actions';
import { schema } from '../../../utils';
import { db, Project, storage } from '../../../firebase';

export const createProject = createAction('CREATE_PROJECT', async (values) => {
  const id = await Project.create(values);
  return normalize({ id, ...values }, schema.project);
});

export const deleteProject = createAction('DELETE_PROJECT', async (pid) => {
  await Project.destroy(pid);
  return normalize({ id: pid }, schema.project);
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
  let imageURLs = [ ...values.images ];
  if (values.images.length > 0 && values.images[0] instanceof File) {
    await storage.deleteProjectImages(pid);
    imageURLs = await storage.uploadProjectImages(pid, imageURLs);
  }
  // update Project
  await db.update('projects')(pid)({
    ...values,
    images: imageURLs,
  });
  return normalize({ ...values, images: imageURLs }, schema.project);
});
