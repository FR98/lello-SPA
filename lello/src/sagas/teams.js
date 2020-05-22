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
import * as actions from '../actions/teams';
import * as types from '../types/teams';
import * as schemas from '../schemas/teams';
import {
    API_BASE_URL,
} from '../settings';


function* fetchTeams(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/teams/`,
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
                    entities: { teams },
                    result,
                } = normalize(jsonResult, schemas.teams);
                yield put(actions.completeFetchingTeams(teams, result));
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failFetchingTeams(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingTeams('Connection failed!'));
    }
}
    
export function* watchFetchTeams() {
    yield takeEvery(
        types.FETCH_TEAMS_STARTED,
        fetchTeams,
    );
}

function* addTeam(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/teams/`,
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
                    actions.completeAddingTeam(
                        action.payload.id,
                        jsonResult,
                    )
                );
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failAddingTeam(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failAddingTeam('Connection failed!'));
    }
}
    
export function* watchAddTeam() {
    yield takeEvery(
        types.ADD_TEAM_STARTED,
        addTeam,
    );
}

function* removeTeam(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/teams/${action.payload.id}/`,
                {
                    method: 'DELETE',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                },
            );
        
            if (http.isSuccessful(response.status)) {
                yield put(actions.completeRemovingTeam());
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failRemovingTeam(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failRemovingTeam('Connection failed!'));
    }
}
    
export function* watchRemoveTeam() {
    yield takeEvery(
        types.REMOVE_TEAM_STARTED,
        removeTeam,
    );
}
