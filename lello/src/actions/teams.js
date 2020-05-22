import * as types from '../types/teams';


export const startFetchingTeams = () => ({
    type: types.FETCH_TEAMS_STARTED,
});

export const completeFetchingTeams = (entities, order) => ({
    type: types.FETCH_TEAMS_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingTeams = error => ({
    type: types.FETCH_TEAMS_FAILED,
    payload: {
        error,
    },
});


export const startAddingTeam = team => ({
    type: types.ADD_TEAM_STARTED,
    payload: team,
});

export const completeAddingTeam = (tempId, team) => ({
    type: types.ADD_TEAM_COMPLETED,
    payload: {
        tempId,
        team,
    },
});

export const failAddingTeam = (tempId, error) => ({
    type: types.ADD_TEAM_FAILED,
    payload: {
        tempId,
        error,
    },
});


export const startRemovingTeam = id => ({
    type: types.REMOVE_TEAM_STARTED,
    payload: {
        id,
    },
});

export const completeRemovingTeam = () => ({
    type: types.REMOVE_TEAM_COMPLETED,
});

export const failRemovingTeam = (id, error) => ({
    type: types.REMOVE_TEAM_FAILED,
    payload: {
        id,
        error,
    },
});
