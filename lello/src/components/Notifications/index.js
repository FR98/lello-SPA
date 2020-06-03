import React, {useEffect, Fragment} from "react";
import { connect } from 'react-redux';
import Popup from "reactjs-popup";

import * as selectors from '../../reducers';
import * as actions from '../../actions/notifications';

import './styles.css'; 
import AccessAlarmIcon from '@material-ui/icons/NotificationsNone';

const Notifications = ({ allNotifications, onLoad }) => {
    useEffect(onLoad, []);
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
                    {
                        allNotifications.map(notification => {
                            return(
                                <div key={notification.id} className="notifications-onebyone">
                                    <strong><label>{notification.title}</label></strong>
                                    <label>{notification.description}</label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )}
        </Popup>
    );
}
  
export default connect(
    state => ({
        allNotifications: selectors.getNotifications(state)
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingNotifications());
        }
    }),
)(Notifications);