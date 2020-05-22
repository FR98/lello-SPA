import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css'; 
import * as selectors from '../../../reducers';
import * as actions from '../../../actions/boards';

import {
    GeneralBtn,
} from '../../Buttons';

const ListItem = ({ id, name, isConfirmed = false }) => (
    <tr className={!isConfirmed ? 'list-item--pending' : ''}>
        <td>
            <GeneralBtn text={name} action={actions.startFetchingBoards()}/>
        </td>
    </tr>
);

export default connect(
    (state, { id }) => ({
        ...selectors.getTeam(state, id),
    }),
)(ListItem);