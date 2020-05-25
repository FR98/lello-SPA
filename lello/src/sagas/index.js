import { fork, all } from 'redux-saga/effects';

import {
  watchLoginStarted,
  watchRefreshTokenStarted,
} from './auth';

import {
  watchFetchTeams,
  watchAddTeam,
  watchRemoveTeam,
} from './teams';

import {
  watchFetchBoards,
  watchAddBoard,
  watchRemoveBoard,
} from './boards';

import {
  watchFetchEvents,
  watchAddEvent,
  watchRemoveEvent,
} from './events';


function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchRefreshTokenStarted),
    fork(watchFetchTeams),
    fork(watchAddTeam),
    fork(watchRemoveTeam),
    fork(watchFetchBoards),
    fork(watchAddBoard),
    fork(watchRemoveBoard),
    fork(watchFetchEvents),
    fork(watchAddEvent),
    fork(watchRemoveEvent),
  ]);
}


export default mainSaga;
