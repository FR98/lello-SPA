import React, { Fragment, Redirect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch, useParams } from 'react-router-dom';

import Board from './Board';
import Navbar from '../../Navbar';
import Calendar from '../Calendar';
import OpenCard from '../../Board/OpenCard';

const Boards = () => {
    const { path, url } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}/:id`} component={Board} />
            <Route exact path={`${path}/:id/calendar`} component={Calendar} />
            <Route exact path={`${path}/:id/cards/:cardid`} component={OpenCard} />
        </Switch>
    );
};

export default Boards;
