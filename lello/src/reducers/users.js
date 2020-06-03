import { combineReducers } from 'redux';
import omit from 'lodash/omit';

import * as types from '../types/users';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.FETCH_USERS_COMPLETED: {
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
        case types.ADD_USER_STARTED: {
            const newState = { ...state };
            newState[action.payload.id] = {
                ...action.payload,
                isConfirmed: false,
            };
            return newState;
        }
        case types.ADD_USER_COMPLETED: {
            const { tempId, user } = action.payload;
            const newState = omit(state, tempId);
            newState[user.id] = {
                ...user,
                isConfirmed: true,
            };
            return newState;
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.FETCH_USERS_COMPLETED: {
            return [
                ...action.payload.order,
            ]
        }
        case types.ADD_USER_STARTED: {
            return [...state, action.payload.id]
        }
        case types.ADD_USER_COMPLETED: {
            const { tempId, user } = action.payload;
            return state.map(id => id === tempId ? user.id : id);
        }
        default: {
            return state;
        }
    }
};

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.FETCH_USERS_STARTED: {
            return true;
        }
        case types.FETCH_USERS_COMPLETED: {
            return false;
        }
        case types.FETCH_USERS_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.FETCH_USERS_STARTED:
        case types.ADD_USER_STARTED:
        case types.FETCH_USERS_COMPLETED:
        case types.ADD_USER_COMPLETED:
            return null;
        case types.FETCH_USERS_FAILED:
        case types.ADD_USER_FAILED:
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

export const getUser = (state, id) => state.byId[id];
export const getUsers = state => state.order.map(id => getUser(state, id));
export const isFetchingUsers = state => state.isFetching;
export const getUsersError = state => state.error;

