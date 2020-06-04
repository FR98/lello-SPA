import { fork, all } from 'redux-saga/effects';

import {
  watchLoginStarted,
  watchRefreshTokenStarted,
} from './auth';

import {
  watchFetchUsers,
  watchAddUser,
} from './users';

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

import {
  watchFetchLists,
  watchAddList,
  watchRemoveList,
} from './lists';

import {
  watchFetchCards,
  watchAddCard,
  watchRemoveCard,
} from './cards';

import {
  watchFetchAudits,
} from './audits';

import {
  watchFetchNotifications,
  watchRemoveNotification,
} from './notifications';

import {
  watchFetchChecklists,
  watchAddChecklist,
  watchRemoveChecklist,
} from './checklists';

import {
  watchFetchCheckElements,
  watchAddCheckElement,
  watchRemoveCheckElement,
} from './checkElements';


function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchRefreshTokenStarted),
    fork(watchFetchUsers),
    fork(watchAddUser),
    fork(watchFetchTeams),
    fork(watchAddTeam),
    fork(watchRemoveTeam),
    fork(watchFetchBoards),
    fork(watchAddBoard),
    fork(watchRemoveBoard),
    fork(watchFetchEvents),
    fork(watchAddEvent),
    fork(watchRemoveEvent),
    fork(watchFetchLists),
    fork(watchAddList),
    fork(watchRemoveList),
    fork(watchFetchCards),
    fork(watchAddCard),
    fork(watchRemoveCard),
    fork(watchFetchAudits),
    fork(watchFetchNotifications),
    fork(watchRemoveNotification),
    fork(watchFetchChecklists),
    fork(watchAddChecklist),
    fork(watchRemoveChecklist),
    fork(watchFetchCheckElements),
    fork(watchAddCheckElement),
    fork(watchRemoveCheckElement),
  ]);
}


export default mainSaga;
