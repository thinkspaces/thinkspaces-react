import Firebase from './Firebase';
import { initFirestorter, Collection } from 'firestorter';

initFirestorter({ firebase: Firebase });

const store = {
    users: new Collection('users'),
    projects: new Collection('projects')
};

export store;