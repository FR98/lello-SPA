import React, { Fragment, Redirect } from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';

// import './styles.css'; 

import {
    GeneralBtn,
} from '../../../Buttons';
import Navbar from '../../../Navbar';

const Board = () => {
    const { id } = useParams();
    return (
        <Fragment>
            <Navbar/>
            <h1>{id}</h1>
        </Fragment>
    );
};

export default Board;
