import { combineReducers } from 'redux';

import * as types from '../types/selects';


const selectedTeam = (state = null, action) => {
  switch (action.type) {
    case types.TEAM_SELECTED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const selectedBoard = (state = null, action) => {
    switch (action.type) {
      case types.BOARD_SELECTED: {
        return action.payload;
      }
      default: {
        return state;
      }
    }
};

const selectedList = (state = null, action) => {
    switch (action.type) {
      case types.LIST_SELECTED: {
        return action.payload;
      }
      default: {
        return state;
      }
    }
};


export default combineReducers({
    selectedTeam,
    selectedBoard,
    selectedList,
});


export const getSelectedTeam = state => state.selectedTeam;
export const getSelectedBoard = state => state.selectedBoard;
export const getSelectedList = state => state.selectedList;
