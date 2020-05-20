import React, { Fragment } from 'react';

import './styles.css'; 

import LoginForm from '../LoginForm';
import {
    GeneralBtn,
    SuccessBtn,
    DangerBtn,
} from '../Buttons';

import * as actions from '../../actions/auth';

const Index = () => (
    <Fragment>
        <LoginForm />
        <GeneralBtn text="Configuracion" />
        <SuccessBtn text="Crear" />
        <DangerBtn text="Logout" action={ actions.logout() } />
    </Fragment>
);

export default Index;
