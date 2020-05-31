import { schema } from 'normalizr';


export const notification = new schema.Entity(
    'notifications',
);

export const notifications = new schema.Array(notification);
