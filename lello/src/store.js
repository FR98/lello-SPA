import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// NATIVE: @react-native-community/async-storage

import reducer from './reducers';
import mainSaga from './sagas';

export const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const persistConfig = {
        key: 'rootx',
        storage,
        whitelist: ['auth', 'selects', 'users'],
    };
    
    const persistedReducer = persistReducer(
        persistConfig,
        reducer,
    );

    let composeEnhancers = compose;
    if (process.env.NODE_ENV === 'development') {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    }

    const store = composeEnhancers(
        applyMiddleware(sagaMiddleware),
    )(createStore)(persistedReducer);
        
    const persistor = persistStore(store);
    sagaMiddleware.run(mainSaga);
    return { store, persistor };
}
