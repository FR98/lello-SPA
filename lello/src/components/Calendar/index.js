import React, { Fragment, Redirect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import moment from 'moment';

import './styles.css'; 
import Day from './Day';

import * as selectors from '../../reducers';

const now = moment().format("YYYY-MM-DD");

const Calendar = ({ state }) => {
    console.log(state);
    return (
        <div className='div-display-column'>
            <h1>{moment().format('DD-MM-YYYY')}</h1>
            <div className='calendar'>
                <Day date={ moment().subtract(2, 'days').format("YYYY-MM-DD") } />
                <Day date={ moment().subtract(1, 'days').format("YYYY-MM-DD") } />
                <Day date={ now } />
                <Day date={ moment().add(1, 'days').format("YYYY-MM-DD") } />
                <Day date={ moment().add(2, 'days').format("YYYY-MM-DD") } />
            </div>
        </div>
    );
};

export default connect(
    state => ({
        state,
        events: selectors.getEvents(state, now),
    })
)(Calendar);
