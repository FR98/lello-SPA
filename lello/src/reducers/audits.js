import { combineReducers } from 'redux';
import omit from 'lodash/omit';

import * as types from '../types/audits';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.FETCH_AUDITS_COMPLETED: {
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
        case types.ADD_AUDIT_STARTED: {
            const newState = { ...state };
            newState[action.payload.id] = {
                ...action.payload,
                isConfirmed: false,
            };
            return newState;
        }
        case types.ADD_AUDIT_COMPLETED: {
            const { tempId, Audit } = action.payload;
            const newState = omit(state, tempId);
            newState[Audit.id] = {
                ...Audit,
                isConfirmed: true,
            };
            return newState;
        }
        case types.REMOVE_AUDIT_STARTED: {
            return omit(state, action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.FETCH_AUDITS_COMPLETED: {
            return [
                ...action.payload.order,
            ]
        }
        case types.ADD_AUDIT_STARTED: {
            return [...state, action.payload.id]
        }
        case types.ADD_AUDIT_COMPLETED: {
            const { tempId, Audit } = action.payload;
            return state.map(id => id === tempId ? Audit.id : id);
        }
        case types.REMOVE_AUDIT_STARTED: {
            return state.filter(id => id !== action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.FETCH_AUDITS_STARTED: {
            return true;
        }
        case types.FETCH_AUDITS_COMPLETED: {
            return false;
        }
        case types.FETCH_AUDITS_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.FETCH_AUDITS_STARTED:
        case types.ADD_AUDIT_STARTED:
        case types.REMOVE_AUDIT_STARTED:
        case types.FETCH_AUDITS_COMPLETED:
        case types.ADD_AUDIT_COMPLETED:
        case types.REMOVE_AUDIT_COMPLETED:
            return null;
        case types.FETCH_AUDITS_FAILED:
        case types.ADD_AUDIT_FAILED:
        case types.REMOVE_AUDIT_FAILED:
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

export const getAudit = (state, id) => state.byId[id];
export const getAudits = state => state.order.map(id => getAudit(state, id));
export const isFetchingAudits = state => state.isFetching;
export const getAuditsError = state => state.error;
