import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css'; 
import * as selectors from '../../../reducers';
import * as actions from '../../../actions/boards';
import * as selectActions from '../../../actions/selects';

import {
    SuccessBtn,
    DangerBtn,
} from '../../Buttons';

const BoardCard = ({ id, name, isConfirmed = false }) => (
    <div className={ "board-card display-column " + (!isConfirmed ? 'pending' : '') }>
        <h1 className="board-name">{ name }</h1>
        <div className='div-display-row'>
            <Link to={ `/boards/${ id }` }>
                <SuccessBtn text={ "Ir a tablero" } action={ selectActions.selectBoard(id) } />
            </Link>
            <DangerBtn text={ "x" } action={ actions.startRemovingBoard(id) } />
        </div>
    </div>
);

export default connect(
    (state, { id }) => ({
        ...selectors.getBoard(state, id),
    })
)(BoardCard);
