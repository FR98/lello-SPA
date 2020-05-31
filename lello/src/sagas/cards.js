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
import * as actions from '../actions/cards';
import * as listsActions from '../actions/lists';
import * as types from '../types/cards';
import * as schemas from '../schemas/cards';
import {
    API_BASE_URL,
} from '../settings';


function* fetchCards(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/lists/${action.payload.listId}/cards/`,
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
                    entities: { cards },
                    result,
                } = normalize(jsonResult, schemas.cards);
                yield put(actions.completeFetchingCards(cards, result));
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failFetchingCards(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingCards('Connection failed!'));
    }
}
    
export function* watchFetchCards() {
    yield takeEvery(
        types.FETCH_CARDS_STARTED,
        fetchCards,
    );
}

function* addCard(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/cards/`,
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
                    actions.completeAddingCard(
                        action.payload.id,
                        jsonResult,
                    )
                );
                // yield put(listsActions.startRefreshingList(action.payload.lista));
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failAddingCard(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failAddingCard('Connection failed!'));
    }
}
    
export function* watchAddCard() {
    yield takeEvery(
        types.ADD_CARD_STARTED,
        addCard,
    );
}

function* removeCard(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/cards/${action.payload.id}/`,
                {
                    method: 'DELETE',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                },
            );
        
            if (http.isSuccessful(response.status)) {
                yield put(actions.completeRemovingCard());
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failRemovingCard(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failRemovingCard('Connection failed!'));
    }
}
    
export function* watchRemoveCard() {
    yield takeEvery(
        types.REMOVE_CARD_STARTED,
        removeCard,
    );
}
