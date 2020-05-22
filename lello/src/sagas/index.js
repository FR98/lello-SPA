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
  ]);
}


export default mainSaga;
