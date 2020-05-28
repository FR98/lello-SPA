import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Field, reduxForm } from 'redux-form';

// import './styles.css'; 
import * as selectors from '../../../reducers';
import * as actions from '../../../actions/teams';
import ListItem from '../ListItem';


const NewTeamForm = ({ handleSubmit, isLoading }) => (
    <form onSubmit={handleSubmit}>
        {
            !isLoading && (
                <div className="div-display-column">
                    <Field
                        name='name'
                        type='text'
                        placeholder="New team name"
                        component='input'
                    />
                    {/* <input
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
                    /> */}
                    {/* <SuccessBtn text={"Create team"} action={ actions.startAddingTeam({ name })} /> */}
                    <button type="submit">
                        {'Crear'}
                    </button>
                </div>
            )
        }
    </form>
);

export default connect(
    state => ({
        isLoading: selectors.isFetchingTeams(state),
    }),
)(
    reduxForm({
        form: 'addTeam',
        onSubmit({ name }, dispatch) {
            dispatch(
                actions.startAddingTeam({
                    id: uuid(),
                    name,
                }),
            );
        },
    })(NewTeamForm)
);