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
import * as actions from '../actions/lists';
import * as types from '../types/lists';
import * as schemas from '../schemas/lists';
import {
    API_BASE_URL,
} from '../settings';


function* fetchLists(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/lists/`,
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
                    entities: { lists },
                    result,
                } = normalize(jsonResult, schemas.lists);
                yield put(actions.completeFetchingLists(lists, result));
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failFetchingLists(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingLists('Connection failed!'));
    }
}
    
export function* watchFetchLists() {
    yield takeEvery(
        types.FETCH_LISTS_STARTED,
        fetchLists,
    );
}

function* addList(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/lists/`,
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
                    actions.completeAddingList(
                        action.payload.id,
                        jsonResult,
                    )
                );
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failAddingList(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failAddingList('Connection failed!'));
    }
}
    
export function* watchAddList() {
    yield takeEvery(
        types.ADD_LIST_STARTED,
        addList,
    );
}

function* removeList(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/lists/${action.payload.id}/`,
                {
                    method: 'DELETE',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                },
            );
        
            if (http.isSuccessful(response.status)) {
                yield put(actions.completeRemovingList());
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failRemovingList(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failRemovingList('Connection failed!'));
    }
}
    
export function* watchRemoveList() {
    yield takeEvery(
        types.REMOVE_LIST_STARTED,
        removeList,
    );
}
