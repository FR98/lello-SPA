import React, { Fragment, Redirect } from 'react';
import { BrowserRouter as Router, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

// import './styles.css'; 

import {
    GeneralBtn,
} from '../../Buttons';
import Navbar from '../../Navbar';
import Calendar from '../../Calendar';

const CalendarView = () => {
    const { id } = useParams();
    return (
        <Fragment>
            <Navbar/>
            <Calendar />
        </Fragment>
    );
};

export default CalendarView;
