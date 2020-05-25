import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css'; 
import * as selectors from '../../../reducers';
import * as actions from '../../../actions/boards';

import {
    SuccessBtn,
} from '../../Buttons';

const BoardCard = ({ id, name, isConfirmed = false }) => (
    <div className={"board-card display-column " + (!isConfirmed ? 'pending' : '')}>
        <h1 className="board-name">{ name }</h1>
        <Link to={`/boards/${id}`}>
            <SuccessBtn text={"Ir a tablero"} />
        </Link>
    </div>
);

export default connect(
    (state, { id }) => ({
        ...selectors.getBoard(state, id),
    })
)(BoardCard);
