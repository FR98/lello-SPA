import React from "react";
import { connect } from 'react-redux';
import Popup from "reactjs-popup";

import * as selectors from '../../../reducers';
import './styles.css'; 
import NotificationIcon from '@material-ui/icons/notifications_none';

const Notifications = () => {
    return(
        <Popup trigger={<NotificacionIcon />} position="bottom center">
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
  
export default connect(
    (state, {id}) => ({
        data: selectors.getBoard(state, id),
    })
)(Notifications);