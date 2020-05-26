import { combineReducers } from 'redux';
import omit from 'lodash/omit';

import * as types from '../types/lists';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.FETCH_LISTS_COMPLETED: {
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
        case types.ADD_LIST_STARTED: {
            const newState = { ...state };
            newState[action.payload.id] = {
                ...action.payload,
                isConfirmed: false,
            };
            return newState;
        }
        case types.ADD_LIST_COMPLETED: {
            const { tempId, list } = action.payload;
            const newState = omit(state, tempId);
            newState[list.id] = {
                ...list,
                isConfirmed: true,
            };
            return newState;
        }
        case types.REMOVE_LIST_STARTED: {
            return omit(state, action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.FETCH_LISTS_COMPLETED: {
            return [
                ...state,
                ...action.payload.order,
            ]
        }
        case types.ADD_LIST_STARTED: {
            return [...state, action.payload.id]
        }
        case types.ADD_LIST_COMPLETED: {
            const { tempId, list } = action.payload;
            return state.map(id => id === tempId ? list.id : id);
        }
        case types.REMOVE_LIST_STARTED: {
            return state.filter(id => id !== action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.FETCH_LISTS_STARTED: {
            return true;
        }
        case types.FETCH_LISTS_COMPLETED: {
            return false;
        }
        case types.FETCH_LISTS_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.FETCH_LISTS_STARTED:
        case types.ADD_LIST_STARTED:
        case types.REMOVE_LIST_STARTED:
        case types.FETCH_LISTS_COMPLETED:
        case types.ADD_LIST_COMPLETED:
        case types.REMOVE_LIST_COMPLETED:
            return null;
        case types.FETCH_LISTS_FAILED:
        case types.ADD_LIST_FAILED:
        case types.REMOVE_LIST_FAILED:
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

export const getList = (state, id) => state.byId[id];
export const getLists = state => state.order.map(id => getList(state, id));
export const isFetchingLists = state => state.isFetching;
export const getFetchingListsError = state => state.error;
