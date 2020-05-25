import React, { Fragment, Redirect } from 'react';
import { BrowserRouter as Router, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

import './styles.css'; 

import Navbar from '../../../Navbar';
import NavbarBoard from '../../../NavbarBoard';
import Cardlist from '../../../Board/Cardlist';


const Board = () => {
    const { path, url } = useRouteMatch();
    const { id } = useParams();
    return(
        <Fragment>
            <Navbar />
            <NavbarBoard />
            <Cardlist/>
        </Fragment>
    );
}

export default Board;


