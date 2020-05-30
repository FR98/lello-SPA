import React, { Fragment, Redirect, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';

import './styles.css'; 
import * as selectors from '../../../../reducers';
import * as actions from '../../../../actions/lists';

import { GeneralBtn } from '../../../Buttons'; 
import Navbar from '../../../Navbar';
import NavbarBoard from '../../../NavbarBoard';
import Cardlist from '../../../Board/Cardlist';
import OpenCard from '../../../Board/OpenCard';
import NewCardListForm from '../../../Board/NewCardListForm'


const Board = ({ lists, isLoading, onLoad }) => {
    useEffect(onLoad, []);
    return(
        <Fragment>
            <Navbar />
            <NavbarBoard />
            <div className="board-container">
                <div>
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
                                lists.map(({ id }) => <Cardlist key={ id } id={ id } />)
                            )
                        }
                    </div>
                </div>
                <div className="btn-addList">
                    <NewCardListForm/>
                </div>
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
        onLoad(boardId) {
            dispatch(actions.startFetchingLists(boardId));
        }
    }),
    (stateProps, dispatchProps, ownProps) => ({
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        onLoad() {
            dispatchProps.onLoad(ownProps.match.params.id);
        }
    }),
)(Board);
