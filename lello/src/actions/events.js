import * as types from '../types/events';


export const startFetchingEvents = calendarId => ({
    type: types.FETCH_EVENTS_STARTED,
    payload: {
        calendarId,
    }
});

export const completeFetchingEvents = (entities, order) => ({
    type: types.FETCH_EVENTS_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingEvents = error => ({
    type: types.FETCH_EVENTS_FAILED,
    payload: {
        error,
    },
});


export const startAddingEvent = event => ({
    type: types.ADD_EVENT_STARTED,
    payload: event,
});

export const completeAddingEvent = (tempId, event) => ({
    type: types.ADD_EVENT_COMPLETED,
    payload: {
        tempId,
        event,
    },
});

export const failAddingEvent = (tempId, error) => ({
    type: types.ADD_EVENT_FAILED,
    payload: {
        tempId,
        error,
    },
});


export const startRemovingEvent = id => ({
    type: types.REMOVE_EVENT_STARTED,
    payload: {
        id,
    },
});

export const completeRemovingEvent = () => ({
    type: types.REMOVE_EVENT_COMPLETED,
});

export const failRemovingEvent = (id, error) => ({
    type: types.REMOVE_EVENT_FAILED,
    payload: {
        id,
        error,
    },
});
