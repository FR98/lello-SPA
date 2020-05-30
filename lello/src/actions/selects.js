import * as types from '../types/selects';


export const selectTeam = id => ({
    type: types.TEAM_SELECTED,
    payload: id,
});

export const selectBoard = id => ({
    type: types.BOARD_SELECTED,
    payload: id,
});

export const selectList = id => ({
    type: types.LIST_SELECTED,
    payload: id,
});
