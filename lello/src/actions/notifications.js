import * as types from '../types/notifications';


export const startFetchingNotifications = listId => ({
    type: types.FETCH_NOTIFICATIONS_STARTED,
    payload: {
        listId,
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

