import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css'; 

import {GeneralBtn} from '../../Buttons';

const Card = ({ data }) => (
    <div className="card-container">
        <div className="card-superiorContainer">
            <label className="card-title">
                Models
            </label>
            <label>
                #1
            </label>
        </div>
        <div className="card-inferiorContainer">
            <label>
                24/05/2020
            </label>
            <label>
                2
            </label>
            <label>
                Willi
            </label>
        </div>
    </div>
);

export default connect(
    state => ({
        data: state,
    })
)(Card);