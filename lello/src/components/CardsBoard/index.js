import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import './styles.css'; 
import * as selectors from '../../reducers';
import * as actions from '../../actions/boards';

import BoardCard from './BoardCard';
import NewBoardForm from './NewBoardForm';


const CardsBoard = ({ boards, isLoading }) => {
    return (
        <div className='cards-board'>
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
                    <Fragment>
                        {
                            boards.map(({ id }) => <BoardCard key={id} id={id} />)
                        }
                    </Fragment>
                )
            }
            {
                !isLoading && (
                    <div className="div-display-column board-card">
                        <NewBoardForm />
                    </div>
                )
            }
        </div>
    );
}

export default connect(
    state => ({
        boards: selectors.getBoards(state),
        isLoading: selectors.isFetchingBoards(state),
    }),
)(CardsBoard);
