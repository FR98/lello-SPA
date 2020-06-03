import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css'; 

import {
    DangerBtn,
} from '../Buttons';

import * as actions from '../../actions/auth';
import * as selectors from '../../reducers';
import Notifications from '../Notifications';
import Profile from '../Profile';


const Navbar = ({
    isAuthenticated = false,
    authUsername = ''
}) => (
    <div className="navbar">
        <Link to='/dashboard'>
            <img src = {'https://cdn.worldvectorlogo.com/logos/trello.svg'} className="navbar-logo" />
        </Link>
        {
            isAuthenticated ? (
                <>
                    <h3>{'TODO BUSCADOR'}</h3>
                    <div className='div-display-row'>
                        <Notifications/>
                        <div className='div-display-column'>
                            {/* <img src = {'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png'} className = 'navbar-image' /> */}
                            <Profile />
                            {/* <h5 className='navbar-text navbar-username'>{ authUsername }</h5> */}
                        </div>
                        <DangerBtn text="Logout" action={ actions.logout() } />
                    </div>
                </>
            ) : (
                <></>
            )
        }
    </div>
);

export default connect(
    state => ({
        isAuthenticated: selectors.isAuthenticated(state),
        authUsername: selectors.getAuthUsername(state),
    })
)(Navbar);