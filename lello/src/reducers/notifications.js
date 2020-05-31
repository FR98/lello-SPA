import { combineReducers } from 'redux';
import omit from 'lodash/omit';

import * as types from '../types/notifications';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.FETCH_NOTIFICATIONS_COMPLETED: {
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
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.FETCH_NOTIFICATIONS_COMPLETED: {
            return [
                ...action.payload.order,
            ]
        }
        default: {
            return state;
        }
    }
};

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.FETCH_NOTIFICATIONS_STARTED: {
            return true;
        }
        case types.FETCH_NOTIFICATIONS_COMPLETED: {
            return false;
        }
        case types.FETCH_NOTIFICATIONS_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.FETCH_NOTIFICATIONS_STARTED:
        case types.FETCH_NOTIFICATIONS_COMPLETED:
            return null;
        case types.FETCH_NOTIFICATIONS_FAILED:
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

export const getNotification = (state, id) => state.byId[id];
export const getNotifications = state => state.order.map(id => getNotification(state, id));
export const isFetchingNotifications = state => state.isFetching;
export const getNotificationsError = state => state.error;
