import * as types from '../types/cards';


export const startFetchingCards = () => ({
    type: types.FETCH_CARDS_STARTED,
});

export const completeFetchingCards = (entities, order) => ({
    type: types.FETCH_CARDS_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingCards = error => ({
    type: types.FETCH_CARDS_FAILED,
    payload: {
        error,
    },
});


export const startAddingCard = card => ({
    type: types.ADD_CARD_STARTED,
    payload: card,
});

export const completeAddingCard = (tempId, card) => ({
    type: types.ADD_CARD_COMPLETED,
    payload: {
        tempId,
        card,
    },
});

export const failAddingCard = (tempId, error) => ({
    type: types.ADD_CARD_FAILED,
    payload: {
        tempId,
        error,
    },
});


export const startRemovingCard = id => ({
    type: types.REMOVE_CARD_STARTED,
    payload: {
        id,
    },
});

export const completeRemovingCard = () => ({
    type: types.REMOVE_CARD_COMPLETED,
});

export const failRemovingCard = (id, error) => ({
    type: types.REMOVE_CARD_FAILED,
    payload: {
        id,
        error,
    },
});
