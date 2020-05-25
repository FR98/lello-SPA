import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import './styles.css'; 
import * as selectors from '../../reducers';
import * as actions from '../../actions/boards';

import BoardCard from './BoardCard';

const CardsBoard = ({ boards, isLoading, onLoad }) => {
    useEffect(onLoad, []);
    return (
        <Fragment>
            {
                boards.length === 0 && !isLoading && (
                    <p>{ 'No hay' }</p>
                )
            }
            {
                isLoading && (
                    <p>{ 'Cargando...' }</p>
                )
            }
            {
                boards.length > 0 && !isLoading && (
                    <div className='cards-board'>
                        {
                            boards.map(({ id }) => <BoardCard id={id} />)
                        }
                    </div>
                )
            }
        </Fragment>
    );
}

export default connect(
    state => ({
        boards: selectors.getBoards(state),
        isLoading: selectors.isFetchingBoards(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingBoards());
        }
    }),
)(CardsBoard);
