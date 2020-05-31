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
import * as actions from '../actions/users';
import * as types from '../types/users';
import * as schemas from '../schemas/users';
import {
    API_BASE_URL,
} from '../settings';


function* fetchUsers(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/teams/${action.payload.teamId}/members/`,
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
                    entities: { users },
                    result,
                } = normalize(jsonResult, schemas.users);
                yield put(actions.completeFetchingUsers(users, result));
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failFetchingUsers(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingUsers('Connection failed!'));
    }
}
    
export function* watchFetchUsers() {
    yield takeEvery(
        types.FETCH_USERS_STARTED,
        fetchUsers,
    );
}

function* addUser(action) {
    try {
        const response = yield call(
            fetch,
            `${API_BASE_URL}/users/`,
            {
                method: 'POST',
                body: JSON.stringify(action.payload),
                headers:{
                    'Content-Type': 'application/json',
                },
            },
        );
    
        if (http.isSuccessful(response.status)) {
            const jsonResult = yield response.json();
            yield put(
                actions.completeAddingUser(
                    action.payload.id,
                    jsonResult,
                )
            );
        } else {
            const { non_field_errors } = yield response.json();
            yield put(actions.failAddingUser(non_field_errors[0]));
        }
    } catch (error) {
        yield put(actions.failAddingUser('Connection failed!'));
    }
}
    
export function* watchAddUser() {
    yield takeEvery(
        types.ADD_USER_STARTED,
        addUser,
    );
}
