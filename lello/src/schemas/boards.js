import { schema } from 'normalizr';


export const board = new schema.Entity(
    'boards',
);

export const boards = new schema.Array(board);
