import { combineReducers } from 'redux';
import omit from 'lodash/omit';

import * as types from '../types/checklists';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.FETCH_CHECKLISTS_COMPLETED: {
            const newState = { ...state };
            const { checklists, order } = action.payload;
            order.forEach(id => {
                newState[id] = {
                    ...checklists[id],
                    isConfirmed: true,
                };
            });
            return newState;
        }
        case types.ADD_CHECKLIST_STARTED: {
            const newState = { ...state };
            newState[action.payload.id] = {
                ...action.payload,
                isConfirmed: false,
            };
            return newState;
        }
        case types.ADD_CHECKLIST_COMPLETED: {
            const { tempId, checklist } = action.payload;
            const newState = omit(state, tempId);
            newState[checklist.id] = {
                ...checklist,
                isConfirmed: true,
            };
            return newState;
        }
        case types.REMOVE_CHECKLIST_STARTED: {
            return omit(state, action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.FETCH_CHECKLISTS_COMPLETED: {
            return [
                ...action.payload.order,
            ]
        }
        case types.ADD_CHECKLIST_STARTED: {
            return [...state, action.payload.id]
        }
        case types.ADD_CHECKLIST_COMPLETED: {
            const { tempId, list } = action.payload;
            return state.map(id => id === tempId ? list.id : id);
        }
        case types.REMOVE_CHECKLIST_STARTED: {
            return state.filter(id => id !== action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.FETCH_CHECKLISTS_STARTED: {
            return true;
        }
        case types.FETCH_CHECKLISTS_COMPLETED: {
            return false;
        }
        case types.FETCH_CHECKLISTS_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.FETCH_CHECKLISTS_STARTED:
        case types.ADD_CHECKLIST_STARTED:
        case types.REMOVE_CHECKLIST_STARTED:
        case types.FETCH_CHECKLISTS_COMPLETED:
        case types.ADD_CHECKLIST_COMPLETED:
        case types.REMOVE_CHECKLIST_COMPLETED:
            return null;
        case types.FETCH_CHECKLISTS_FAILED:
        case types.ADD_CHECKLIST_FAILED:
        case types.REMOVE_CHECKLIST_FAILED:
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

export const getChecklist = (state, id) => state.byId[id];
export const getChecklists = state => state.order.map(id => getChecklist(state, id));
export const isFetchingChecklists = state => state.isFetching;
export const getChecklistsError = state => state.error;
