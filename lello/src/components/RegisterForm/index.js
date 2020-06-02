import React, { useState } from 'react';
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


const RegisterForm = ({
    onSubmit,
    isLoading,
    error = null,
    isAuthenticated = false
}) => {
    const [username, changeUsername] = useState('');
    const [password, changePassword] = useState('');
    if (isAuthenticated) {
        return (
            <Redirect to='/dashboard' />
        );
    }
    return (
        <div className="page">
            <div className='register-form'>
                <h1>BIENVENIDO A LELLO</h1>
                <h2>Registro</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => changeUsername(e.target.value)}
                    className="register-input"
                />
                <br/>
                <input
                    type="text"
                    placeholder="Gender"
                    value={username}
                    onChange={e => changeUsername(e.target.value)}
                    className="register-input"
                />
                <br/>
                <input
                    type="text"
                    placeholder="Phone"
                    value={username}
                    onChange={e => changeUsername(e.target.value)}
                    className="register-input"
                />
                <br/>
                <input
                    type="text"
                    placeholder="Birth Date"
                    value={username}
                    onChange={e => changeUsername(e.target.value)}
                    className="register-input"
                />
                <br/>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => changePassword(e.target.value)}
                    className="register-input"
                />
                    <br/>
                <p>
                    {
                        isLoading ? (
                            <strong>{'Cargando...'}</strong>
                        ) : (
                            <button type="submit" onClick={
                                () => onSubmit(username, password)
                            }
                            className="btn-register">
                                {'Enviar'}
                            </button>
                        )
                    }
                </p>
                {
                    error && (
                    <p>
                        <strong className='error-text'>{ error }</strong>
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
    }),
    dispatch => ({
        onSubmit(username, password) {
            dispatch(actions.startLogin(username, password));
        },
    }),
)(RegisterForm);
