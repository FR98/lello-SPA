import * as types from '../types/audits';


export const startFetchingAudits = listId => ({
    type: types.FETCH_AUDITS_STARTED,
    payload: {
        listId,
    }
});

export const completeFetchingAudits = (entities, order) => ({
    type: types.FETCH_AUDITS_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingAudits = error => ({
    type: types.FETCH_AUDITS_FAILED,
    payload: {
        error,
    },
});


// export const startAddingAudit = card => ({
//     type: types.ADD_AUDIT_STARTED,
//     payload: card,
// });

// export const completeAddingAudit = (tempId, card) => ({
//     type: types.ADD_AUDIT_COMPLETED,
//     payload: {
//         tempId,
//         card,
//     },
// });

// export const failAddingAudit = (tempId, error) => ({
//     type: types.ADD_AUDIT_FAILED,
//     payload: {
//         tempId,
//         error,
//     },
// });


// export const startRemovingAudit = id => ({
//     type: types.REMOVE_AUDIT_STARTED,
//     payload: {
//         id,
//     },
// });

// export const completeRemovingAudit = () => ({
//     type: types.REMOVE_AUDIT_COMPLETED,
// });

// export const failRemovingAudit = (id, error) => ({
//     type: types.REMOVE_AUDIT_FAILED,
//     payload: {
//         id,
//         error,
//     },
// });
