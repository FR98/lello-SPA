import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth, * as authSelectors from './auth';
import teams, * as teamsSelectors from './teams';
import boards, * as boardsSelectors from './boards';
import events, * as eventsSelectors from './events';
import lists, * as listsSelectors from './lists';
import cards, * as cardsSelectors from './cards';
import selects, * as selectsSelectors from './selects';

const reducer = combineReducers({
    auth,
    teams,
    boards,
    events,
    lists,
    cards,
    selects,
    form: formReducer,
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
export const getTeamsError = state => teamsSelectors.getTeamsError(state.teams);

export const getBoard = (state, id) => boardsSelectors.getBoard(state.boards, id);
export const getBoards = state => boardsSelectors.getBoards(state.boards);
export const isFetchingBoards = state => boardsSelectors.isFetchingBoards(state.boards);
export const getBoardsError = state => boardsSelectors.getBoardsError(state.boards);

export const getEvent = (state, id) => eventsSelectors.getEvent(state.events, id);
export const getEvents = state => eventsSelectors.getEvents(state.events);
export const getEventsOnMonth = (state, date) => eventsSelectors.getEventsOnMonth(state.events, date);
export const getEventsOnDay = (state, date) => eventsSelectors.getEventsOnDay(state.events, date);
export const isFetchingEvents = state => eventsSelectors.isFetchingEvents(state.events);
export const getEventsError = state => eventsSelectors.getEventsError(state.events);

export const getList = (state, id) => listsSelectors.getList(state.lists, id);
export const getLists = state => listsSelectors.getLists(state.lists);
export const isFetchingLists = state => listsSelectors.isFetchingLists(state.lists);
export const getListsError = state => listsSelectors.getListsError(state.lists);

export const getCard = (state, id) => cardsSelectors.getCard(state.cards, id);
export const getCards = state => cardsSelectors.getCards(state.cards);
export const isFetchingCards = state => cardsSelectors.isFetchingCards(state.cards);
export const getCardsError = state =>  cardsSelectors.getCardsError(state.cards);

export const getSelectedTeam = state => selectsSelectors.getSelectedTeam(state.selects);
export const getSelectedBoard = state => selectsSelectors.getSelectedBoard(state.selects);
export const getSelectedList = state => selectsSelectors.getSelectedList(state.selects);


export const getListCardsIds = (state, id) => {
    const list = listsSelectors.getList(state.lists, id);
    const cards = [];
    list.card_set.map(id => {
        const card = cardsSelectors.getCard(state.cards, id)
        card && cards.push(card.id)
    });
    return cards;
};
