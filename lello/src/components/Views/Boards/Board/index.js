import React, { Fragment, Redirect, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';

import './styles.css'; 
import * as selectors from '../../../../reducers';
import * as actions from '../../../../actions/lists';

import Navbar from '../../../Navbar';
import NavbarBoard from '../../../NavbarBoard';
import Cardlist from '../../../Board/Cardlist';


const Board = ({lists, isLoading, onLoad}) => {
    useEffect(onLoad, []);
    const { path, url } = useRouteMatch();
    const { id } = useParams();
    return(
        <Fragment>
            <Navbar />
            <NavbarBoard />
            <div className="cardLists-container">
                {
                    lists.length === 0 && !isLoading && (
                        <p>{ 'No hay' }</p>
                    )
                }
                {
                    isLoading && (
                        <p>{ 'Cargando...' }</p>
                    )
                }
                {
                    lists.length > 0 && !isLoading && (
                        lists.map(({ id }) => <Cardlist key={id} id={id} />)        
                    )
                }
            </div>
        </Fragment>
    );
}

export default connect(
    state => ({
        lists: selectors.getLists(state),
        isLoading: selectors.isFetchingLists(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingLists());
        }
    }),
)(Board);


