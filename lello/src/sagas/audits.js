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
import * as actions from '../actions/audits';
import * as types from '../types/audits';
import * as schemas from '../schemas/audits';
import {
    API_BASE_URL,
} from '../settings';


function* fetchAudits(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/audits/`,
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
                    entities: { audits },
                    result,
                } = normalize(jsonResult, schemas.audits);
                yield put(actions.completeFetchingAudits(audits, result));
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failFetchingAudits(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingAudits('Connection failed!'));
    }
}
    
export function* watchFetchAudits() {
    yield takeEvery(
        types.FETCH_AUDITS_STARTED,
        fetchAudits,
    );
}
    