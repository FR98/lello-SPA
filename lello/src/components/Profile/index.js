import React, {useEffect} from "react";
import { connect } from 'react-redux';
import Popup from "reactjs-popup";

import * as selectors from '../../reducers';
import * as actions from '../../actions/users';

import './styles.css'; 
import PersonIcon from '@material-ui/icons/Person';

const Profile = ({userId, state}) => {
    const data = selectors.getUser(state, userId);
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
                <div className="registerInfo">
                    <label className="info"><b>Username:</b> {data.username}</label>
                    <label><b>Email: </b> {data.email}</label>
                    <label></label>
                </div>
            </div>
        )}
        </Popup>
    );
}
  
export default connect(
    state => ({
        userId: selectors.getAuthUserID(state),
        state: state,
    }),
)(Profile);