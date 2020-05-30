import React from "react";
import { connect } from 'react-redux';
import Popup from "reactjs-popup";

import './styles.css'; 
import AccessAlarmIcon from '@material-ui/icons/NotificationsNone';

const Notifications = () => {
    return(
        <Popup trigger={<AccessAlarmIcon className="iconNot" fontSize="large"/>} position="bottom center">
        {close => (
            <div className="notifications-container">
        
                <a className="close" onClick={close}>
                    &times;
                </a>

                <div className="notifications-title">
                    <h2>Notificaciones</h2>
                </div>
                <div className="notifications-items">
                    <label>Notificacion 1</label>
                </div>
            </div>
        )}
        </Popup>
    );
}
  
export default (Notifications);