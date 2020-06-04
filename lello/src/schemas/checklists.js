import { schema } from 'normalizr';
import { checkElements } from './checkElements';


export const checklist = new schema.Entity(
    'checklists', {element_set: checkElements}
);

export const checklists = new schema.Array(checklist);
