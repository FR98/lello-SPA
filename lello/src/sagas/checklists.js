import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    // delay,
    select,
} from 'redux-saga/effects';
import { normalize } from 'normalizr';

import * as http from '../utils/http';
import * as selectors from '../reducers';
import * as actions from '../actions/checklists';
import * as types from '../types/checklists';
import * as schemas from '../schemas/checklists';
import {
    API_BASE_URL,
} from '../settings';


function* fetchChecklists(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/cards/${action.payload.cardId}/checklist/`,
                {
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                },
            );

            if (http.isSuccessful(response.status)) {
                const jsonResult = yield response.json();
                const {
                    entities,
                    result,
                } = normalize(jsonResult, schemas.checklists);
                yield put(actions.completeFetchingChecklists(entities, result));
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failFetchingChecklists(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingChecklists('Connection failed!'));
    }
}
    
export function* watchFetchChecklists() {
    yield takeEvery(
        types.FETCH_CHECKLISTS_STARTED,
        fetchChecklists,
    );
}

function* addChecklist(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/checklists/`,
                {
                    method: 'POST',
                    body: JSON.stringify(action.payload),
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                },
            );
        
            if (http.isSuccessful(response.status)) {
                const jsonResult = yield response.json();
                yield put(
                    actions.completeAddingChecklist(
                        action.payload.id,
                        jsonResult,
                    )
                );
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failAddingChecklist(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failAddingChecklist('Connection failed!'));
    }
}
    
export function* watchAddChecklist() {
    yield takeEvery(
        types.ADD_CHECKLIST_STARTED,
        addChecklist,
    );
}

function* removeChecklist(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/checklists/${action.payload.id}/`,
                {
                    method: 'DELETE',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                },
            );
        
            if (http.isSuccessful(response.status)) {
                yield put(actions.completeRemovingChecklist());
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failRemovingChecklist(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failRemovingChecklist('Connection failed!'));
    }
}
    
export function* watchRemoveChecklist() {
    yield takeEvery(
        types.REMOVE_CHECKLIST_STARTED,
        removeChecklist,
    );
}
