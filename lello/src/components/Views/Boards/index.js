import React, { Fragment, Redirect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch } from 'react-router-dom';

import Board from './Board';
import Navbar from '../../Navbar';
import Calendar from '../Calendar';

const Boards = () => {
    const { path, url } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}/:id`} component={Board} />
            <Route exact path={`${path}/:id/calendar`} component={Calendar} />
        </Switch>
    );
};

export default Boards;
