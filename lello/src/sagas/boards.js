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
import * as actions from '../actions/boards';
import * as types from '../types/boards';
import * as schemas from '../schemas/boards';
import {
    API_BASE_URL,
} from '../settings';


function* fetchBoards(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/teams/${action.payload.teamId}/boards`,
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
                    entities: { boards },
                    result,
                } = normalize(jsonResult, schemas.boards);
                yield put(actions.completeFetchingBoards(boards, result));
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failFetchingBoards(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingBoards('Connection failed!'));
    }
}
    
export function* watchFetchBoards() {
    yield takeEvery(
        types.FETCH_BOARDS_STARTED,
        fetchBoards,
    );
}

function* addBoard(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/boards/`,
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
                    actions.completeAddingBoard(
                        action.payload.id,
                        jsonResult,
                    )
                );
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failAddingBoard(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failAddingBoard('Connection failed!'));
    }
}
    
export function* watchAddBoard() {
    yield takeEvery(
        types.ADD_BOARD_STARTED,
        addBoard,
    );
}

function* removeBoard(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/boards/${action.payload.id}/`,
                {
                    method: 'DELETE',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                },
            );
        
            if (http.isSuccessful(response.status)) {
                yield put(actions.completeRemovingBoard());
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failRemovingBoard(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failRemovingBoard('Connection failed!'));
    }
}
    
export function* watchRemoveBoard() {
    yield takeEvery(
        types.REMOVE_BOARD_STARTED,
        removeBoard,
    );
}
