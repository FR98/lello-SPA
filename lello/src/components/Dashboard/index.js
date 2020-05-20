import React, { Fragment } from 'react';

// import './styles.css'; 

import {
    GeneralBtn,
    SuccessBtn,
    DangerBtn,
} from '../Buttons';

import * as actions from '../../actions/auth';


const Dashboard = () => (
    <Fragment>
        <GeneralBtn text="Configuracion" />
        <SuccessBtn text="Crear" />
        <DangerBtn text="Logout" action={ actions.logout() } />
    </Fragment>
);

export default Dashboard;
