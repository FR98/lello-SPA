import { combineReducers } from 'redux';

import auth, * as authSelectors from './auth';
import teams, * as teamsSelectors from './teams';
import boards, * as boardsSelectors from './boards';

const reducer = combineReducers({
    auth,
    teams,
    boards,
});

export default reducer;

export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const isAuthenticated = state => getAuthToken(state) != null;
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
export const getIsRefreshingToken = state => authSelectors.getIsRefreshingToken(state.auth);
export const getRefreshingError = state => authSelectors.getRefreshingError(state.auth);

export const getTeam = (state, id) => teamsSelectors.getTeam(state.teams, id);
export const getTeams = state => teamsSelectors.getTeams(state.teams);
export const isFetchingTeams = state => teamsSelectors.isFetchingTeams(state.teams);
export const getFetchingTeamsError = state => teamsSelectors.getFetchingTeamsError(state.teams);

export const getBoard = (state, id) => boardsSelectors.getBoard(state.boards, id);
export const getBoards = state => boardsSelectors.getBoards(state.boards);
export const isFetchingBoards = state => boardsSelectors.isFetchingBoards(state.boards);
export const getFetchingBoardsError = state => boardsSelectors.getFetchingBoardsError(state.boards);
