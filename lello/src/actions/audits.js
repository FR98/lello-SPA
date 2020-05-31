import * as types from '../types/audits';


export const startFetchingAudits = listId => ({
    type: types.FETCH_AUDITS_STARTED,
    payload: {
        listId,
    }
});

export const completeFetchingAudits = (entities, order) => ({
    type: types.FETCH_AUDITS_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingAudits = error => ({
    type: types.FETCH_AUDITS_FAILED,
    payload: {
        error,
    },
});

