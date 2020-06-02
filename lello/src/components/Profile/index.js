import React, {useEffect} from "react";
import { connect } from 'react-redux';
import Popup from "reactjs-popup";

import * as selectors from '../../reducers';
import * as actions from '../../actions/users';

import './styles.css'; 
import PersonIcon from '@material-ui/icons/Person';

const Profile = ({userId, state}) => {
    console.log(userId)
    const data = selectors.getUser(state, userId);
    return(
        <Popup trigger={<PersonIcon className="iconPer" fontSize="large"/>} position="bottom center">
        {close => (
            <div className="notifications-container">
                {console.log("Data: ", data)}

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
  
export default connect(
    state => ({
        userId: selectors.getAuthUserID(state),
        state: state,
    }),
)(Profile);