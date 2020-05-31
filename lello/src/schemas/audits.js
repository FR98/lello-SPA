import { schema } from 'normalizr';


export const audit = new schema.Entity(
    'audits',
);

export const audits = new schema.Array(audit);
