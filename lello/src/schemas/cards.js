import { schema } from 'normalizr';


export const card = new schema.Entity(
    'cards',
);

export const cards = new schema.Array(card);
