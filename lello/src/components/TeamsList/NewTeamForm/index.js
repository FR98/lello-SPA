import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Field, reduxForm, reset } from 'redux-form';

import * as actions from '../../../actions/teams';
import { SuccessBtn } from '../../Buttons';


const RenderInput = ({ input, meta }) => (
    <Fragment>
        {
            meta.dirty && meta.error && (
                <strong className='error-text'>{ meta.error }</strong>
            )
        }
        <input { ...input } />
    </Fragment>
);

const NewTeamForm = ({ handleSubmit }) => (
    <form onSubmit={ handleSubmit }>
        <div className="div-display-column">
            <Field
                name='name'
                type='text'
                placeholder="New team name"
                component={ RenderInput }
            />
            <SuccessBtn 
                text={"Create team"}
                type={'submit'}
            />
        </div>
    </form>
);

export default connect(
    state => ({}),
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
            dispatch(reset('addTeam'));
        },
        validate(values) {
            const errors = {};
            if (values.name && values.name.length < 5) {
                errors.name = "El nombre es muy corto!";
            }
            return errors;
        }
    })(NewTeamForm)
);
