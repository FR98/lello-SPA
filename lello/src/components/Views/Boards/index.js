import React, { Fragment, Redirect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch } from 'react-router-dom';

import Board from './Board';

const Boards = () => {
    const { path, url } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}/:id`} component={Board} />
        </Switch>
    );
};

export default Boards;
