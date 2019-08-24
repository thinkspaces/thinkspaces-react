import { orderBy, isNil } from 'lodash';
import { createSelector } from 'reselect';

const getTags = state => state.data.tags;

const getProjects = state => orderBy(state.data.projects, [ 'name' ], [ 'asc' ]);

export default createSelector(
  [ getTags, getProjects ],
  (tags, projects) =>
    projects.map(project =>
      (!isNil(project.tags)
        ? { ...project, tags: project.tags.map(id => tags[id]) }
        : { ...project, tags: [] })),
);
