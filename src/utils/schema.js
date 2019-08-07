import { schema } from 'normalizr';

const { Entity } = schema;

export const project = new Entity('projects', {}, { idAttribute: 'id' });
export const tag = new Entity('tags', {}, { idAttribute: 'id' });
export const user = new Entity('users', {}, { idAttribute: 'id' });
