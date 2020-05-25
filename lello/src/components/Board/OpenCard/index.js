import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css'; 

import {GeneralBtn} from '../../Buttons';

const OpenCard = ({ data }) => (
    <div className="openCard-container">
        <div className="openCard-header">
            <label className="openCard-title">
                Models
            </label>
            <label className="openCard-number">
                #1
            </label>
        </div>
        <div className="openCard-body">
            <div className="openCard-members">
                <label>
                    Willi
                </label>
                <label>
                    Luca
                </label>
            <div/>
            <div className="openCard-tags">
                <label>
                    Frontend - React
                </label>
            </div>
            <div className="openCard-date-hours">
                <div className="openCard-date">
                    <label>
                        24/05/2020
                    </label>
                </div>
                <div className="openCard-hours">
                    <label>
                        11
                    </label>
                    <label>
                        14
                    </label>
                </div>
            </div>
            <div className="openCard-buttons">
                <GeneralBtn text="Unirse"/>
                <GeneralBtn text="Miembros"/>
                <GeneralBtn text="Etiquetas"/>
                <GeneralBtn text="Checklist"/>
                <GeneralBtn text="Vencimiento"/>
            </div>
        </div>
    </div>
);

export default connect(
    state => ({
        data: state,
    })
)(OpenCard);