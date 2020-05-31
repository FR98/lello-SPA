import React from "react";
import { connect } from 'react-redux';
import Popup from "reactjs-popup";

import './styles.css'; 
import PersonIcon from '@material-ui/icons/Person';

const Profile = () => {
    return(
        <Popup trigger={<PersonIcon className="iconPer" fontSize="large"/>} position="bottom center">
        {close => (
            <div className="notifications-container">
        
                <a className="close" onClick={close}>
                    &times;
                </a>

                <div className="notifications-title">
                    <h2>Perfil</h2>
                </div>
                <div>
                    <label>Bill Gates</label>
                </div>
            </div>
        )}
        </Popup>
    );
}
  
export default (Profile);