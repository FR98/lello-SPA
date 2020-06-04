import * as types from '../types/checklists';


export const startFetchingChecklists = cardId => ({
    type: types.FETCH_CHECKLISTS_STARTED,
    payload: {
        cardId,
    }
});

export const completeFetchingChecklists = ({ checklists, elements }, order) => ({
    type: types.FETCH_CHECKLISTS_COMPLETED,
    payload: {
        checklists,
        elements,
        order,
    },
});

export const failFetchingChecklists = error => ({
    type: types.FETCH_CHECKLISTS_FAILED,
    payload: {
        error,
    },
});


export const startAddingChecklist = checklist => ({
    type: types.ADD_CHECKLIST_STARTED,
    payload: checklist,
});

export const completeAddingChecklist = (tempId, checklist) => ({
    type: types.ADD_CHECKLIST_COMPLETED,
    payload: {
        tempId,
        checklist,
    },
});

export const failAddingChecklist = (tempId, error) => ({
    type: types.ADD_CHECKLIST_FAILED,
    payload: {
        tempId,
        error,
    },
});


export const startRemovingChecklist = id => ({
    type: types.REMOVE_CHECKLIST_STARTED,
    payload: {
        id,
    },
});

export const completeRemovingChecklist = () => ({
    type: types.REMOVE_CHECKLIST_COMPLETED,
});

export const failRemovingChecklist = (id, error) => ({
    type: types.REMOVE_CHECKLIST_FAILED,
    payload: {
        id,
        error,
    },
});
