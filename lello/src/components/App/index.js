import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { configureStore } from '../../store';
import { PersistGate } from 'redux-persist/integration/react';

import './styles.css';
import {
    tokenReviewTime,
} from '../../settings';

import Index from '../Index';
import TokenRefresh from '../TokenRefresh';


const { store, persistor } = configureStore();

const App = () => (
    <div className = "App">
        <Provider store = {store}>
            <PersistGate loading = { null } persistor = { persistor }>
                <TokenRefresh reviewTime={tokenReviewTime}/>
                <Router>
                    <Switch>

                        <Route path = '/'>
                            <Index/>
                        </Route>
                        <Route path = '/signup'>
                            {/* <SignUp/> */}
                        </Route>

                    </Switch>
                </Router>
            </PersistGate>
        </Provider>
    </div>
);

export default App;