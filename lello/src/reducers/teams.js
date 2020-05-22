import { combineReducers } from 'redux';
import omit from 'lodash/omit';

import * as types from '../types/teams';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.FETCH_TEAMS_COMPLETED: {
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
        case types.ADD_TEAM_STARTED: {
            const newState = { ...state };
            newState[action.payload.id] = {
                ...action.payload,
                isConfirmed: false,
            };
            return newState;
        }
        case types.ADD_TEAM_COMPLETED: {
            const { tempId, team } = action.payload;
            const newState = omit(state, tempId);
            newState[team.id] = {
                ...team,
                isConfirmed: true,
            };
            return newState;
        }
        case types.REMOVE_TEAM_STARTED: {
            return omit(state, action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.FETCH_TEAMS_COMPLETED: {
            return [
                ...state,
                ...action.payload.order,
            ]
        }
        case types.ADD_TEAM_STARTED: {
            return [...state, action.payload.id]
        }
        case types.ADD_TEAM_COMPLETED: {
            const { tempId, team } = action.payload;
            return state.map(id => id === tempId ? team.id : id);
        }
        case types.REMOVE_TEAM_STARTED: {
            return state.filter(id => id !== action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.FETCH_TEAMS_STARTED: {
            return true;
        }
        case types.FETCH_TEAMS_COMPLETED: {
            return false;
        }
        case types.FETCH_TEAMS_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.FETCH_TEAMS_STARTED:
        case types.ADD_TEAM_STARTED:
        case types.REMOVE_TEAM_STARTED:
        case types.FETCH_TEAMS_COMPLETED:
        case types.ADD_TEAM_COMPLETED:
        case types.REMOVE_TEAM_COMPLETED:
            return null;
        case types.FETCH_TEAMS_FAILED:
        case types.ADD_TEAM_FAILED:
        case types.REMOVE_TEAM_FAILED:
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

export const getTeam = (state, id) => state.byId[id];
export const getTeams = state => state.order.map(id => getTeam(state, id));
export const isFetchingTeams = state => state.isFetching;
export const getFetchingTeamsError = state => state.error;
