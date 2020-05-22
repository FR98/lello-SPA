import React, { Fragment } from 'react';

// import './styles.css'; 

import {
    GeneralBtn,
    SuccessBtn,
    DangerBtn,
} from '../../Buttons';
import Navbar from '../../Navbar';
import Sidebar from '../../Sidebar';
import CardsBoard from '../../CardsBoard';


const Dashboard = () => (
    <Fragment>
        <Navbar />
        <div className='page-content'>
            <Sidebar />
            <div className='div-display'>
                <CardsBoard />
            </div>
        </div>
    </Fragment>
);

export default Dashboard;
