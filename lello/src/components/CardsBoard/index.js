import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';

import './styles.css'; 
import * as selectors from '../../reducers';
import * as actions from '../../actions/boards';

import BoardCard from './BoardCard';

const CardsBoard = ({ boards, isLoading, onLoad, onSubmit }) => {
    useEffect(onLoad, []);
    const [name, setName] = useState('');
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
                            boards.map(({ id }) => <BoardCard id={id} />)
                        }
                    </Fragment>
                )
            }
            {
                !isLoading && (
                    <div className="div-display-column board-card">
                        <input
                            type="text"
                            placeholder="New board name"
                            value={ name }
                            onChange={e => setName(e.target.value)}
                            onKeyDown={
                                e => {
                                    if (e.key === "Enter") {
                                        onSubmit(name);
                                        setName('');
                                    }
                                }
                            }
                        />
                        <button type="submit" className="success-button" onClick={
                            () => {
                                onSubmit(name)
                                setName('');
                            }
                        }>
                            {'Enviar'}
                        </button>
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
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingBoards());
        },
        onSubmit(name, team) {
            dispatch(actions.startAddingBoard({
                id: uuid(),
                name,
                team,
            }));
        }
    }),
)(CardsBoard);
