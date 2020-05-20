import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
    useParams
} from "react-router-dom";

import * as selectors from '../../reducers';
import * as actions from '../../actions/auth';

import './styles.css'; 


const LoginForm = ({
    onSubmit,
    isLoading,
    error = null,
    isAuthenticated = false,
    authUsername = '',
}) => {
    const [username, changeUsername] = useState('');
    const [password, changePassword] = useState('');
    if (isAuthenticated) {
        return (
            <Redirect to='/dashboard' />
            // <h1>{`Bienvenido ${authUsername} nuevamente!`}</h1>
        );
    }
    return (
        <div className="page-content">
            <div className='login-form'>
                <h1>BIENVENIDO A LELLO</h1>
                <p>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => changeUsername(e.target.value)}
                    />
                    <br/>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => changePassword(e.target.value)}
                    />
                </p>
                <p>
                    {
                        isLoading ? (
                            <strong>{'Cargando...'}</strong>
                        ) : (
                            <button type="submit" onClick={
                                () => onSubmit(username, password)
                            }>
                                {'Enviar'}
                            </button>
                            // <Link to = 'dashboardTutor'>
                            //     <button>
                            //         Continuar
                            //     </button>
                            //     {/* <button className="continuar" type="submit" onClick={
                                //     () => onSubmit(username, password)
                            //     }>
                            //     {'Continuar'}
                            //     </button> */}
                            // </Link>
                        )
                    }
                </p>
                {
                    error && (
                    <p>
                        <strong>{ error }</strong>
                    </p>
                    )
                }
            </div>
        </div>
    );
};

export default connect(
    state => ({
        isLoading: selectors.getIsAuthenticating(state),
        error: selectors.getAuthenticatingError(state),
        isAuthenticated: selectors.isAuthenticated(state),
        authUsername: selectors.getAuthUsername(state),
    }),
    dispatch => ({
        onSubmit(username, password) {
            dispatch(actions.startLogin(username, password));
        },
    }),
)(LoginForm);
