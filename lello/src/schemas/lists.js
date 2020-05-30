import { schema } from 'normalizr';
import { cards } from './cards';


export const list = new schema.Entity(
    'lists', {card_set: cards}
);

export const lists = new schema.Array(list);
