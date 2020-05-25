import React from 'react';
import { connect } from 'react-redux';

import './styles.css'; 
import * as selectors from '../../../reducers';
import * as actions from '../../../actions/boards';

import {
    SuccessBtn,
} from '../../Buttons';

const Event = ({ id, title, isConfirmed = false }) => (
    <tr className={"event " + (!isConfirmed ? 'pending' : '')}>
        <td>
            <SuccessBtn text={title} />
        </td>
    </tr>
);

export default connect(
    (state, { id }) => ({
        ...selectors.getEvent(state, id),
    }),
)(Event);
