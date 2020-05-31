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
        case types.FETCH_AUDITS_COMPLETED:
            return null;
        case types.FETCH_AUDITS_FAILED:
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
