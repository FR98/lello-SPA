import React, { Fragment } from 'react';

import './styles.css'; 

import LoginForm from '../../LoginForm';
import Navbar from '../../Navbar';


const Index = () => (
    <Fragment>
        <Navbar />
        <LoginForm />
    </Fragment>
);

export default Index;
