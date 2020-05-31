import React from "react";
import { connect } from 'react-redux';
import Popup from "reactjs-popup";

import * as selectors from '../../../reducers';
import './styles.css'; 

const BoardDescription = ({ data, audits }) => {
    return(
        <Popup trigger={<button className="general-button">Mostrar menú</button>} modal>
        {close => (
            <div className="descriptionBoard-container">
                {console.log(data)}
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
                    {console.log(audits)}
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
    }),
    dispatch
)(BoardDescription);