import React, { Fragment } from 'react';

// import './styles.css'; 

import {
    GeneralBtn,
    SuccessBtn,
    DangerBtn,
} from '../../Buttons';
import Navbar from '../../Navbar';
import Sidebar from '../../Sidebar';


const Dashboard = () => (
    <Fragment>
        <Navbar />
        <div className='page-content'>
            <Sidebar />
            <div className='div-display'>
                {/* <Board /> */}
                <GeneralBtn text="Configuracion" />
                <SuccessBtn text="Crear" />
                <DangerBtn text="Borrar" />
            </div>
        </div>
    </Fragment>
);

export default Dashboard;
