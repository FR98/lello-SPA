import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css'; 

import {GeneralBtn} from '../../Buttons';
import Card from '../Card';

const Cardlist = ({ data }) => (
    <div className="cardlist-container">
        <div className="header-cardlist">
            <div className="carlist-title">
                <label>
                    Titulo Tablero
                </label>
            </div>
            <div className="cardlist-hpurs">
                <label>
                    11
                </label>
            </div>
        </div>
        <Card/>
        <GeneralBtn text="+ Añadir otra tarjeta"/>
    </div>
);

export default connect(
    state => ({
        data: state,
    })
)(Cardlist);