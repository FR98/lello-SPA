import { schema } from 'normalizr';
import { elements } from './elements';


export const checklist = new schema.Entity(
    'checklists', {element_set: elements}
);

export const checklists = new schema.Array(checklist);
