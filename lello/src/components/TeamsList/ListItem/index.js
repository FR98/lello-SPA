import React from 'react';
import { connect } from 'react-redux';

import './styles.css'; 
import * as selectors from '../../../reducers';
import * as actions from '../../../actions/boards';
import * as teamsActions from '../../../actions/teams';

import {
    GeneralBtn,
    DangerBtn,
} from '../../Buttons';

const ListItem = ({ id, name, isConfirmed = false }) => (
    <tr className={"list-item " + (!isConfirmed ? 'pending' : '')}>
        <td>
            <GeneralBtn text={ name } action={ actions.startFetchingBoards(id) } />
        </td>
        <td>
            <DangerBtn text={ "x" } action={ teamsActions.startRemovingTeam(id) } />
        </td>
    </tr>
);

export default connect(
    (state, { id }) => ({
        ...selectors.getTeam(state, id),
    }),
)(ListItem);