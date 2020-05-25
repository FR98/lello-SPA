import React, { Fragment } from 'react';

import './styles.css'; 

import Navbar from '../../../Navbar';
import NavbarBoard from '../../../NavbarBoard';
import Cardlist from '../../../Board/Cardlist';


const Board = () => (
    <Fragment>
        <Navbar />
        <NavbarBoard />
        <Cardlist/>
    </Fragment>
);

export default Board;


