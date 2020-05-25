import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css'; 

import TeamsList from '../TeamsList';
import {GeneralBtn} from '../Buttons';

import * as selectors from '../../reducers';


const NavbarBoard = ({ data }) => (
    <div className="navbarBoard-container">
        <div className="navbarBoard-left">
            <label className="board-title">
                Proyecto web
            </label>
            <GeneralBtn text="UVG Teams"/>
            <GeneralBtn text="Público"/>
        </div>
        <div className="navbarBoard-rigth">
            <GeneralBtn text="Calendario"/>
            <GeneralBtn text="Mostrar menú"/>
        </div>
    </div>
);

export default connect(
    state => ({
        data: state,
    })
)(NavbarBoard);