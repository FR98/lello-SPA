import { schema } from 'normalizr';


export const list = new schema.Entity(
    'lists',
);

export const lists = new schema.Array(list);
