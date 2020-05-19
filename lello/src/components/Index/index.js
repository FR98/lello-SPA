import React, { Fragment } from 'react';

import './styles.css'; 

import LoginForm from '../LoginForm';
import LogoutButton from '../LogoutButton';

const Index = () => (
    <Fragment>
        <LoginForm />
        <LogoutButton />
    </Fragment>
);

export default Index;
