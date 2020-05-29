import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Popup from "reactjs-popup";

import './styles.css'; 
import * as selectors from '../../../reducers';
import * as actions from '../../../actions/cards';

import {GeneralBtn} from '../../Buttons';

// TODO: REVISAR; NO SE PUEDE HACER REFRESH
const OpenCard = ({ state, onLoad }) => {
    useEffect(onLoad, [])
    const { cardid, id } = useParams();
    const data = selectors.getCard(state, cardid);
    return(
        <div className="all-container">
            <div className="openCard-container">
                <div className="close">
                    <Link to={`/boards/${id}`}>
                        <label>X</label>
                    </Link>
                </div>
                <div className="openCard-header">
                    <label className="openCard-number-title">
                        #{data.number} {data.title}
                    </label>
                </div>
                <div className="openCard-body">
                    <div className="openCard-left-body-container">
                        <div className="left-body-container-superior">
                            <div className="openCard-members">
                                <label className="subTitles">
                                    MIEMBROS
                                </label>
                                <label className="openCard-content">
                                {
                                    data.assigned_to.length === 0 && (
                                        <p>{ '' }</p>
                                    )
                                }
                                {
                                    data.assigned_to.length > 0  && (
                                        data.assigned_to.map(({ member_id }) => <div>member_id</div>)        
                                    )
                                }
                                </label>
                            </div>
                            <div className="openCard-tags">
                                <label className="subTitles">
                                    ETIQUETAS
                                </label>
                                <label className="openCard-content">
                                    {data.label}
                                </label>
                            </div>
                            <div className="openCard-date-hours">
                                <div className="openCard-date">
                                    <label className="subTitles">
                                        DEADLINE
                                    </label>
                                    <label className="openCard-content">
                                        {
                                            data.deadline ? moment(data.deadline).format('DD/MM/YYYY') : "" 
                                        }
                                    </label>
                                </div>
                                <div className="openCard-hours">
                                    <label className="subTitles">
                                        HORAS TERMINADAS
                                    </label>
                                    <label className="openCard-content">
                                        {data.hours_done}
                                    </label>
                                    <label className="subTitles">
                                        HORAS ESTIMADAS
                                    </label>
                                    <label className="openCard-content">
                                        {data.hours_estimated}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="left-body-container-inferior">
                            <label>
                                DESCRIPCIÓN
                            </label>
                            <label className="openCard-content">{data.description}</label>
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
        </div>
    );
}

export default connect(
    state => ({
        state: state,
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingCards());
        }
    })
)(OpenCard);