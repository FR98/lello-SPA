import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

import './styles.css'; 

import TeamsList from '../TeamsList';
import {GeneralBtn} from '../Buttons';
import BoardDescription from '../Board/BoardDescription';

import * as selectors from '../../reducers';


const NavbarBoard = ({ data, boardId }) => {
    const { path, url } = useRouteMatch();
    return(
        <div className="navbarBoard-container">
            <div className="navbarBoard-left">
                <label className="board-title">
                    Proyecto web
                </label>
                <GeneralBtn text="UVG Teams"/>
                <GeneralBtn text="Público"/>
            </div>
            <div className="navbarBoard-rigth">
                <Link to={'${path}/calendar'}>
                    <GeneralBtn text="Calendario"/>
                </Link>
                {console.log(boardId)}
                <BoardDescription id={boardId}/>
            </div>
        </div>
    );
}

export default connect(
    state => ({
        data: state,
        boardId: selectors.getSelectedBoard(state),
    })
)(NavbarBoard);