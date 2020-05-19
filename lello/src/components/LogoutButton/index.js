import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as actions from '../../actions/auth';


const LogoutButton = ({ onClick }) => (
    <button 
      className='logout-button' 
      onClick={ onClick }>
        { 'Logout' }
    </button>
);


export default connect(
    undefined,
    dispatch => ({
        onClick() {
            dispatch(actions.logout());
        },
    })
)(LogoutButton);
