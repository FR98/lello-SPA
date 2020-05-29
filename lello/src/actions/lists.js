import * as types from '../types/lists';


export const startFetchingLists = boardId => ({
    type: types.FETCH_LISTS_STARTED,
    payload: {
        boardId,
    }
});

export const completeFetchingLists = (entities, order) => ({
    type: types.FETCH_LISTS_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingLists = error => ({
    type: types.FETCH_LISTS_FAILED,
    payload: {
        error,
    },
});


export const startAddingList = list => ({
    type: types.ADD_LIST_STARTED,
    payload: list,
});

export const completeAddingList = (tempId, list) => ({
    type: types.ADD_LIST_COMPLETED,
    payload: {
        tempId,
        list,
    },
});

export const failAddingList = (tempId, error) => ({
    type: types.ADD_LIST_FAILED,
    payload: {
        tempId,
        error,
    },
});


export const startRemovingList = id => ({
    type: types.REMOVE_LIST_STARTED,
    payload: {
        id,
    },
});

export const completeRemovingList = () => ({
    type: types.REMOVE_LIST_COMPLETED,
});

export const failRemovingList = (id, error) => ({
    type: types.REMOVE_LIST_FAILED,
    payload: {
        id,
        error,
    },
});
