import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { routerActions } from 'react-router-redux';
import { configureStore } from '../../store';
import { PersistGate } from 'redux-persist/integration/react';
import { 
    connectedRouterRedirect,
    connectedReduxRedirect,
} from 'redux-auth-wrapper/history4/redirect';

import './styles.css';
import {
    tokenReviewTime,
} from '../../settings';

import * as selectors from '../../reducers';

import TokenRefresh from '../TokenRefresh';
import Index from '../Views/Index';
import Dashboard from '../Views/Dashboard';
import Boards from '../Views/Boards';


const UserIsAuthenticated = connectedRouterRedirect({
    redirectPath: '/',
    authenticatedSelector: selectors.isAuthenticated,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'userIsAuthenticated',
});

const routes = [
    {
        path: '/',
        exact: true,
        component: Index,
    },
    {
        path: '/dashboard',
        exact: true,
        component: UserIsAuthenticated(Dashboard),
    },
    {
        path: '/boards',
        exact: false,
        component: UserIsAuthenticated(Boards),
    },
    // {
    //     path: '/users',
    //     exact: true,
    //     component: UserIsAuthenticated(Dashboard),
    // },
    // {
    //     path: '/calendars',
    //     exact: true,
    //     component: UserIsAuthenticated(Dashboard),
    // },
];

const { store, persistor } = configureStore();

const App = () => (
    <div className = "App">
        <Provider store = {store}>
            <PersistGate loading = { null } persistor = { persistor }>
                <TokenRefresh reviewTime={tokenReviewTime}/>
                <Router>
                    <Switch>
                        {
                            routes.map( route => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.component}
                                />
                            ))
                        }
                    </Switch>
                </Router>
            </PersistGate>
        </Provider>
    </div>
);

export default App;
