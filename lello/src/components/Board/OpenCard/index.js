import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Popup from "reactjs-popup";

import './styles.css'; 
import * as selectors from '../../../reducers';
import * as actions from '../../../actions/cards';

import { GeneralBtn } from '../../Buttons';

// const nodemailer = require('nodemailer');
// var express = require('express');
// var router = express.Router();





// TODO: REVISAR; NO SE PUEDE HACER REFRESH
const OpenCard = ({ state }) => {
    const { cardid, id } = useParams();
    const data = selectors.getCard(state, cardid);

    const [disabled, setDisabled] = useState(true);
    
    function handleClick() {
        setDisabled(!disabled);
    }

    // const boardId = selectors.getSelectedBoard(state)
    // const board = selectors.getBoard(state, boardId)

    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.hotmail.com',
    //     service: 'hotmail',
    //     // port: 465,
    //     // secure: false,
    //     auth: {
    //         user: 'lelloinc@hotmail.com',
    //         pass: 'lelloadmin123'
    //     }
    // });
    
    // router.post('/send', (res) => {

    //     const mailOptions = {
    //         from: 'lelloinc@hotmail.com',
    //         to: 'gianluca.ping@gmail.com',
    //         subject: 'Sending Email using Node.js',
    //         text: 'Sos el mejor mano'
    //     }

    //     transporter.sendMail(mailOptions, (err, data) => {
    //         if (err) {
    //           res.json({
    //             msg: 'fail'
    //           })
    //         } else {
    //           res.json({
    //             msg: 'success'
    //           })
    //         }
    //     })
    // })

//     const mandarEmail = (transporter, mailOptions) => transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });

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
                                        data.assigned_to.map(member_id => <div>{ selectors.getUser(state, member_id).username }</div>)
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
                            <textarea disabled={disabled} className="openCard-content" placeholder="Colocar descripcion aqui">{data.description}</textarea>
                            <button type="submit" onClick={handleClick}>{disabled ? "Editar": "Guardar"}</button>
                        </div>
                    </div>
                    <div className="openCard-buttons">
                        <GeneralBtn text="Unirse"/>
                        <GeneralBtn text="Miembros"/>
                        <GeneralBtn text="Etiquetas"/>
                        <GeneralBtn text="Checklist"/>
                        <GeneralBtn text="Vencimiento"/>
                        <button className="general-button" >Notificar tarjeta</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(
    state => ({
        state: state,
    })
)(OpenCard);