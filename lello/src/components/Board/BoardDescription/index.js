import React from "react";
import Popup from "reactjs-popup";

import './styles.css'; 

const BoardDescription = () => (
    <Popup trigger={<button className="general-button">Mostrar menú</button>} modal>
      {close => (
        <div className="descriptionBoard-container">
            <a className="close" onClick={close}>
                &times;
            </a>
            <div className="descriptionBoard-creators">
                <h2>Creado por</h2>
                <label className="creators">Willii</label>
                <label className="creators">Luca</label>
            </div>
            <div className="descriptionBoard-description">
                <h2>Descripción</h2>
                <p className="creators">Descripcion del tablero aqui</p>
            </div>
        </div>
      )}
    </Popup>
  );
  
  export default (BoardDescription);