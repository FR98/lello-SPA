import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import moment from 'moment';

import './styles.css'; 
import Day from './Day';

import * as selectors from '../../reducers';
import * as actions from '../../actions/events';

import { getSelectedBoard } from '../../reducers/selects';
const now = moment().format("YYYY-MM-DD");

const Calendar = ({ onLoad }) => {
    useEffect(onLoad, []);
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
        boardId: selectors.getSelectedBoard(state),
    }),
    dispatch => ({
        onLoad(boardId) {
            dispatch(actions.startFetchingEvents(boardId))
        },
    }),
    (stateProps, dispatchProps, ownProps) => ({
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        onLoad() {
            dispatchProps.onLoad(stateProps.boardId);
            console.log("adfa", stateProps)
        }
    }),
)(Calendar);
