import { schema } from 'normalizr';


export const element = new schema.Entity(
    'elements',
);

export const elements = new schema.Array(element);
