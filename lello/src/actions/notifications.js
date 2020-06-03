import * as types from '../types/notifications';


export const startFetchingNotifications = userId => ({
    type: types.FETCH_NOTIFICATIONS_STARTED,
    payload: {
        userId,
    }
});

export const completeFetchingNotifications = (entities, order) => ({
    type: types.FETCH_NOTIFICATIONS_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingNotifications = error => ({
    type: types.FETCH_NOTIFICATIONS_FAILED,
    payload: {
        error,
    },
});

