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
import * as actions from '../actions/notifications';
import * as types from '../types/notifications';
import * as schemas from '../schemas/notifications';
import {
    API_BASE_URL,
} from '../settings';


function* fetchNotifications(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        const userId = yield select(selectors.getAuthUserID);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/users/${userId}/notifications/`,
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
                    entities: { notifications },
                    result,
                } = normalize(jsonResult, schemas.notifications);
                yield put(actions.completeFetchingNotifications(notifications, result));
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failFetchingNotifications(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingNotifications('Connection failed!'));
    }
}
    
export function* watchFetchNotifications() {
    yield takeEvery(
        types.FETCH_NOTIFICATIONS_STARTED,
        fetchNotifications,
    );
}
    