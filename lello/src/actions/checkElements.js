import * as types from '../types/checkElements';


export const startFetchingCheckElements = checklistId => ({
    type: types.FETCH_CHECKELEMENTS_STARTED,
    payload: {
        checklistId,
    }
});

export const completeFetchingCheckElements = (entities, order) => ({
    type: types.FETCH_CHECKELEMENTS_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingCheckElements = error => ({
    type: types.FETCH_CHECKELEMENTS_FAILED,
    payload: {
        error,
    },
});


export const startAddingCheckElement = element => ({
    type: types.ADD_CHECKELEMENT_STARTED,
    payload: element,
});

export const completeAddingCheckElement = (tempId, element) => ({
    type: types.ADD_CHECKELEMENT_COMPLETED,
    payload: {
        tempId,
        element,
    },
});

export const failAddingCheckElement = (tempId, error) => ({
    type: types.ADD_CHECKELEMENT_FAILED,
    payload: {
        tempId,
        error,
    },
});


export const startRemovingCheckElement = id => ({
    type: types.REMOVE_CHECKELEMENT_STARTED,
    payload: {
        id,
    },
});

export const completeRemovingCheckElement = () => ({
    type: types.REMOVE_CHECKELEMENT_COMPLETED,
});

export const failRemovingCheckElement = (id, error) => ({
    type: types.REMOVE_CHECKELEMENT_FAILED,
    payload: {
        id,
        error,
    },
});
