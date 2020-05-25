import { combineReducers } from 'redux';
import omit from 'lodash/omit';

import * as types from '../types/events';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.FETCH_EVENTS_COMPLETED: {
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
        case types.ADD_EVENT_STARTED: {
            const newState = { ...state };
            newState[action.payload.id] = {
                ...action.payload,
                isConfirmed: false,
            };
            return newState;
        }
        case types.ADD_EVENT_COMPLETED: {
            const { tempId, event } = action.payload;
            const newState = omit(state, tempId);
            newState[event.id] = {
                ...event,
                isConfirmed: true,
            };
            return newState;
        }
        case types.REMOVE_EVENT_STARTED: {
            return omit(state, action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.FETCH_EVENTS_COMPLETED: {
            return [
                ...state,
                ...action.payload.order,
            ]
        }
        case types.ADD_EVENT_STARTED: {
            return [...state, action.payload.id]
        }
        case types.ADD_EVENT_COMPLETED: {
            const { tempId, event } = action.payload;
            return state.map(id => id === tempId ? event.id : id);
        }
        case types.REMOVE_EVENT_STARTED: {
            return state.filter(id => id !== action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.FETCH_EVENTS_STARTED: {
            return true;
        }
        case types.FETCH_EVENTS_COMPLETED: {
            return false;
        }
        case types.FETCH_EVENTS_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.FETCH_EVENTS_STARTED:
        case types.ADD_EVENT_STARTED:
        case types.REMOVE_EVENT_STARTED:
        case types.FETCH_EVENTS_COMPLETED:
        case types.ADD_EVENT_COMPLETED:
        case types.REMOVE_EVENT_COMPLETED:
            return null;
        case types.FETCH_EVENTS_FAILED:
        case types.ADD_EVENT_FAILED:
        case types.REMOVE_EVENT_FAILED:
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

export const getEvent = (state, id) => state.byId[id];
export const getEvents = state => state.order.map(id => getEvent(state, id));
export const isFetchingEvents = state => state.isFetching;
export const getFetchingEventsError = state => state.error;
