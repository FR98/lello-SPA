import * as types from '../types/boards';


export const startFetchingBoards = () => ({
    type: types.FETCH_BOARDS_STARTED,
});

export const completeFetchingBoards = (entities, order) => ({
    type: types.FETCH_BOARDS_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingBoards = error => ({
    type: types.FETCH_BOARDS_FAILED,
    payload: {
        error,
    },
});


export const startAddingBoard = board => ({
    type: types.ADD_BOARD_STARTED,
    payload: board,
});

export const completeAddingBoard = (tempId, board) => ({
    type: types.ADD_BOARD_COMPLETED,
    payload: {
        tempId,
        board,
    },
});

export const failAddingBoard = (tempId, error) => ({
    type: types.ADD_BOARD_FAILED,
    payload: {
        tempId,
        error,
    },
});


export const startRemovingBoard = id => ({
    type: types.REMOVE_BOARD_STARTED,
    payload: {
        id,
    },
});

export const completeRemovingBoard = () => ({
    type: types.REMOVE_BOARD_COMPLETED,
});

export const failRemovingBoard = (id, error) => ({
    type: types.REMOVE_BOARD_FAILED,
    payload: {
        id,
        error,
    },
});
