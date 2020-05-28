import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import './styles.css'; 
import * as selectors from '../../reducers';
import * as actions from '../../actions/teams';
import ListItem from './ListItem';
import NewTeamForm from './NewTeamForm';


const TeamsList = ({ teams, isLoading, onLoad, onSubmit }) => {
    useEffect(onLoad, []);
    const [name, setName] = useState('');
    return (
        <Fragment>
            <h2>{ "TEAMS" }</h2>
            <NewTeamForm />
            {
                !isLoading && (
                    <div className="div-display-column">
                        <input
                            type="text"
                            placeholder="New team name"
                            value={ name }
                            onChange={e => setName(e.target.value)}
                            onKeyDown={
                                e => {
                                    if (e.key === "Enter") {
                                        onSubmit(name);
                                        setName('');
                                    }
                                }
                            }
                        />
                        {/* <SuccessBtn text={"Create team"} action={ actions.startAddingTeam({ name })} /> */}
                        <button type="submit" className="success-button" onClick={
                            () => {
                                onSubmit(name)
                                setName('');
                            }
                        }>
                            {'Enviar'}
                        </button>
                    </div>
                )
            }
            {
                teams.length === 0 && !isLoading && (
                    <p>{ 'No hay' }</p>
                )
            }
            {
                isLoading && (
                    <p>{ 'Cargando...' }</p>
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
        onSubmit(name) {
            dispatch(actions.startAddingTeam({
                id: uuid(),
                name
            }));
        }
    }),
)(TeamsList);