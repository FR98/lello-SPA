import { schema } from 'normalizr';


export const team = new schema.Entity(
    'teams',
);

export const teams = new schema.Array(team);
