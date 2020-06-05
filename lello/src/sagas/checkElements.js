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
import * as actions from '../actions/checkElements';
import * as checklistsActions from '../actions/checklists';
import * as types from '../types/checkElements';
import * as schemas from '../schemas/checkElements';
import {
    API_BASE_URL,
} from '../settings';


function* fetchCheckElement(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/checklists/${action.payload.checklistId}/elements/`,
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
                    entities: { checkElement },
                    result,
                } = normalize(jsonResult, schemas.checkElement);
                yield put(actions.completeFetchingCheckElements(checkElement, result));
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failFetchingCheckElements(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingCheckElements('Connection failed!'));
    }
}
    
export function* watchFetchCheckElements() {
    yield takeEvery(
        types.FETCH_CHECKELEMENTS_STARTED,
        fetchCheckElement,
    );
}

function* addCheckElement(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/checkElements/`,
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
                    actions.completeAddingCheckElement(
                        action.payload.id,
                        jsonResult,
                    )
                );
                // yield put(listsActions.startRefreshingList(action.payload.lista));
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failAddingCheckElement(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failAddingCheckElement('Connection failed!'));
    }
}
    
export function* watchAddCheckElement() {
    yield takeEvery(
        types.ADD_CHECKELEMENT_STARTED,
        addCheckElement,
    );
}

function* removeCheckElement(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/checkElements/${action.payload.id}/`,
                {
                    method: 'DELETE',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                },
            );
        
            if (http.isSuccessful(response.status)) {
                yield put(actions.completeRemovingCheckElement());
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failRemovingCheckElement(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failRemovingCheckElement('Connection failed!'));
    }
}
    
export function* watchRemoveCheckElement() {
    yield takeEvery(
        types.REMOVE_CHECKELEMENT_STARTED,
        removeCheckElement,
    );
}
