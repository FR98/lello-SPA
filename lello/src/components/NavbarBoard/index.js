import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

import './styles.css'; 

import TeamsList from '../TeamsList';
import {GeneralBtn} from '../Buttons';
import BoardDescription from '../Board/BoardDescription';

import * as selectors from '../../reducers';


const NavbarBoard = ({ data, boardId, boardData }) => {
    const { path, url } = useRouteMatch();
    return(
        <div className="navbarBoard-container">
            <div className="navbarBoard-left">
                {console.log("tons", boardData)}
                <label className="board-title">
                    {boardData.name}
                </label>
                <GeneralBtn text={data.name}/>
                <GeneralBtn text={boardData.is_private ? "Privado": "Público"}/>
            </div>
            <div className="navbarBoard-rigth">
                <Link to={`${path}/calendar`}>
                    <GeneralBtn text="Calendario" /> 
                </Link>
                <BoardDescription id={boardId}/>
            </div>
        </div>
    );
}

export default connect(
    state => ({
        data: selectors.getTeam(state, selectors.getSelectedTeam(state)),
        boardData: selectors.getBoard(state, selectors.getSelectedBoard(state)),
        boardId: selectors.getSelectedBoard(state),
    })
)(NavbarBoard);