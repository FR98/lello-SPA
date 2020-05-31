import React, { useEffect } from "react";
import { connect } from 'react-redux';
import Popup from "reactjs-popup";

import * as actions from '../../../actions/audits';
import * as selectors from '../../../reducers';
import './styles.css'; 

const BoardDescription = ({ data, audits, onLoad, isLoading }) => {
    useEffect(onLoad, []);
    return(
        <Popup trigger={<button className="general-button">Mostrar menú</button>} modal>
        {close => (
            <div className="descriptionBoard-container">
                <a className="close" onClick={close}>
                    &times;
                </a>
                <div className="descriptionBoard-creators">
                    <h2>Creado por</h2>
                    <label className="creators">{data.owner.username}</label>
                </div>
                <div className="descriptionBoard-description">
                    <h2>Descripción</h2>
                    <textarea className= "creators" placeholder="Descripcion del tablero">{data.descriptiom}</textarea>
                </div>
                <div className="descriptionBoard-audits">
                    <h2>Actividad</h2>
                    {
                        audits.length === 0 && !isLoading && (
                            <p>{ 'No hay' }</p>
                        )
                    }
                    {
                        isLoading && (
                            <p>{ 'Cargando...' }</p>
                        )
                    }
                    {
                        audits.length === 0 && !isLoading && (
                            <p>{ 'No hay' }</p>
                        )
                    }
                    {
                        audits.length > 0 && !isLoading && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Método</th>
                                        <th>Url</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        audits.map(audit => {
                                            return(
                                                <tr key={audit.id}>
                                                    <td>{audit.created_at}</td>
                                                    <td>{audit.httpMethod}</td>
                                                    <td>{audit.url}</td>
                                                </tr>
                                                )
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                    }
                </div>
            </div>
        )}
        </Popup>
    );
}
  
export default connect(
    (state, {id}) => ({
        data: selectors.getBoard(state, id),
        audits: selectors.getAudits(state),
        isLoading: selectors.isFetchingAudits(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingAudits());
        }
    }),
)(BoardDescription);