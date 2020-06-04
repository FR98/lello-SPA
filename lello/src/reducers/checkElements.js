import { combineReducers } from 'redux';
import omit from 'lodash/omit';

import * as types from '../types/checkElements';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.FETCH_CHECKELEMENTS_COMPLETED: {
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
        case types.ADD_CHECKELEMENT_STARTED: {
            const newState = { ...state };
            newState[action.payload.id] = {
                ...action.payload,
                isConfirmed: false,
            };
            return newState;
        }
        case types.ADD_CHECKELEMENT_COMPLETED: {
            const { tempId, element } = action.payload;
            const newState = omit(state, tempId);
            newState[element.id] = {
                ...element,
                isConfirmed: true,
            };
            return newState;
        }
        case types.REMOVE_CHECKELEMENT_STARTED: {
            return omit(state, action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.FETCH_CHECKELEMENTS_COMPLETED: {
            const newState = [ ...state ];
            action.payload.order.map(id => {
                !(id in newState) && newState.push(id);
            });
            return newState;
        }
        case types.ADD_CHECKELEMENT_STARTED: {
            return [...state, action.payload.id]
        }
        case types.ADD_CHECKELEMENT_COMPLETED: {
            const { tempId, element } = action.payload;
            return state.map(id => id === tempId ? element.id : id);
        }
        case types.REMOVE_CHECKELEMENT_STARTED: {
            return state.filter(id => id !== action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.FETCH_CHECKELEMENTS_STARTED: {
            return true;
        }
        case types.FETCH_CHECKELEMENTS_COMPLETED: {
            return false;
        }
        case types.FETCH_CHECKELEMENTS_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.FETCH_CHECKELEMENTS_STARTED:
        case types.ADD_CHECKELEMENT_STARTED:
        case types.REMOVE_CHECKELEMENT_STARTED:
        case types.FETCH_CHECKELEMENTS_COMPLETED:
        case types.ADD_CHECKELEMENT_COMPLETED:
        case types.REMOVE_CHECKELEMENT_COMPLETED:
            return null;
        case types.FETCH_CHECKELEMENTS_FAILED:
        case types.ADD_CHECKELEMENT_FAILED:
        case types.REMOVE_CHECKELEMENT_FAILED:
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

export const getCheckElement = (state, id) => state.byId[id];
export const getCheckElements = state => state.order.map(id => getCheckElement(state, id));
export const isFetchingCheckElements = state => state.isFetching;
export const getCheckElementsError = state => state.error;
