import { combineReducers } from 'redux';
import omit from 'lodash/omit';

import * as types from '../types/boards';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.FETCH_BOARDS_COMPLETED: {
            const newState = { ...state };
            const { entities, order } = action.payload;
            order.forEach(id => {
                newState[id] = {
                    ...entities[id],
                    isConfirmed: true,
                };
            });
            return newState;
        }
        case types.ADD_BOARD_STARTED: {
            const newState = { ...state };
            newState[action.payload.id] = {
                ...action.payload,
                isConfirmed: false,
            };
            return newState;
        }
        case types.ADD_BOARD_COMPLETED: {
            const { tempId, board } = action.payload;
            const newState = omit(state, tempId);
            newState[board.id] = {
                ...board,
                isConfirmed: true,
            };
            return newState;
        }
        case types.REMOVE_BOARD_STARTED: {
            return omit(state, action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.FETCH_BOARDS_COMPLETED: {
            return [
                ...action.payload.order,
            ]
        }
        case types.ADD_BOARD_STARTED: {
            return [...state, action.payload.id]
        }
        case types.ADD_BOARD_COMPLETED: {
            const { tempId, board } = action.payload;
            return state.map(id => id === tempId ? board.id : id);
        }
        case types.REMOVE_BOARD_STARTED: {
            return state.filter(id => id !== action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.FETCH_BOARDS_STARTED: {
            return true;
        }
        case types.FETCH_BOARDS_COMPLETED: {
            return false;
        }
        case types.FETCH_BOARDS_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.FETCH_BOARDS_STARTED:
        case types.ADD_BOARD_STARTED:
        case types.REMOVE_BOARD_STARTED:
        case types.FETCH_BOARDS_COMPLETED:
        case types.ADD_BOARD_COMPLETED:
        case types.REMOVE_BOARD_COMPLETED:
            return null;
        case types.FETCH_BOARDS_FAILED:
        case types.ADD_BOARD_FAILED:
        case types.REMOVE_BOARD_FAILED:
            return action.payload.error;
        default: {
            return state;
        }
    }
};


export default combineReducers({
    byId,
    order,
    isFetching,
    error,
});

export const getBoard = (state, id) => state.byId[id];
export const getBoards = state => state.order.map(id => getBoard(state, id));
export const isFetchingBoards = state => state.isFetching;
export const getFetchingBoardsError = state => state.error;
