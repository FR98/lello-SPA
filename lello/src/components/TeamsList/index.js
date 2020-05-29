import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import './styles.css'; 
import * as selectors from '../../reducers';
import * as actions from '../../actions/teams';
import ListItem from './ListItem';
import NewTeamForm from './NewTeamForm';


const TeamsList = ({ teams, isLoading, onLoad }) => {
    useEffect(onLoad, []);
    return (
        <Fragment>
            <h2>{ "TEAMS" }</h2>
            {
                !isLoading && ( <NewTeamForm /> )
            }
            {
                isLoading && (
                    <p>{ 'Cargando...' }</p>
                )
            }
            {
                teams.length === 0 && !isLoading && (
                    <p>{ 'No hay' }</p>
                )
            }
            {
                teams.length > 0 && !isLoading && (
                    <table>
                        <tbody>
                            {
                                teams.map(({ id }) => <ListItem key={id} id={id} />)
                            }
                        </tbody>
                    </table>
                )
            }
        </Fragment>
    );
}

export default connect(
    state => ({
        teams: selectors.getTeams(state),
        isLoading: selectors.isFetchingTeams(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingTeams());
        },
    }),
)(TeamsList);