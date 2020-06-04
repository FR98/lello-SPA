import * as types from '../types/users';


export const startFetchingUsers = teamId => ({
    type: types.FETCH_USERS_STARTED,
    payload: {
        teamId,
    }
});

export const completeFetchingUsers = (entities, order) => ({
    type: types.FETCH_USERS_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingUsers = error => ({
    type: types.FETCH_USERS_FAILED,
    payload: {
        error,
    },
});


export const startAddingUser = (user, detail) => ({
    type: types.ADD_USER_STARTED,
    payload: {
        user,
        detail
    }
});

export const completeAddingUser = (tempId, user) => ({
    type: types.ADD_USER_COMPLETED,
    payload: {
        tempId,
        user,
    },
});

export const failAddingUser = (tempId, error) => ({
    type: types.ADD_USER_FAILED,
    payload: {
        tempId,
        error,
    },
});
