import { schema } from 'normalizr';


export const checkElement = new schema.Entity(
    'checkElements',
);

export const checkElements = new schema.Array(checkElement);
