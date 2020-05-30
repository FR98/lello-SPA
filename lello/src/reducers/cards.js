import { combineReducers } from 'redux';
import omit from 'lodash/omit';

import * as types from '../types/cards';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.FETCH_CARDS_COMPLETED: {
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
        case types.ADD_CARD_STARTED: {
            const newState = { ...state };
            newState[action.payload.id] = {
                ...action.payload,
                isConfirmed: false,
            };
            return newState;
        }
        case types.ADD_CARD_COMPLETED: {
            const { tempId, card } = action.payload;
            const newState = omit(state, tempId);
            newState[card.id] = {
                ...card,
                isConfirmed: true,
            };
            return newState;
        }
        case types.REMOVE_CARD_STARTED: {
            return omit(state, action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.FETCH_CARDS_COMPLETED: {
            return [
                ...action.payload.order,
            ]
        }
        case types.ADD_CARD_STARTED: {
            return [...state, action.payload.id]
        }
        case types.ADD_CARD_COMPLETED: {
            const { tempId, card } = action.payload;
            return state.map(id => id === tempId ? card.id : id);
        }
        case types.REMOVE_CARD_STARTED: {
            return state.filter(id => id !== action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.FETCH_CARDS_STARTED: {
            return true;
        }
        case types.FETCH_CARDS_COMPLETED: {
            return false;
        }
        case types.FETCH_CARDS_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.FETCH_CARDS_STARTED:
        case types.ADD_CARD_STARTED:
        case types.REMOVE_CARD_STARTED:
        case types.FETCH_CARDS_COMPLETED:
        case types.ADD_CARD_COMPLETED:
        case types.REMOVE_CARD_COMPLETED:
            return null;
        case types.FETCH_CARDS_FAILED:
        case types.ADD_CARD_FAILED:
        case types.REMOVE_CARD_FAILED:
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

export const getCard = (state, id) => state.byId[id];
export const getCards = state => state.order.map(id => getCard(state, id));
export const isFetchingCards = state => state.isFetching;
export const getCardsError = state => state.error;
