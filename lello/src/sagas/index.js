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


function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchRefreshTokenStarted),
    fork(watchFetchTeams),
    fork(watchAddTeam),
    fork(watchRemoveTeam),
  ]);
}


export default mainSaga;
