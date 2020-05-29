import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Field, reduxForm, reset } from 'redux-form';

import * as actions from '../../../actions/boards';
import { SuccessBtn } from '../../Buttons';
import { RenderInput } from '../../FormFields';


const NewBoardForm = ({ handleSubmit }) => (
    <form onSubmit={ handleSubmit }>
        <div className="div-display-column">
            <Field
                name='name'
                type='text'
                placeholder="New board name"
                component={ RenderInput }
            />
            <SuccessBtn 
                text={"Create board"}
                type={'submit'}
            />
        </div>
    </form>
);

export default connect(
    state => ({}),
)(
    reduxForm({
        form: 'addBoard',
        onSubmit({ name }, dispatch) {
            dispatch(
                actions.startAddingBoard({
                    id: uuid(),
                    name,
                }),
            );
            dispatch(reset('addBoard'));
        },
        validate(values) {
            const errors = {};
            if (values.name && values.name.length < 5) {
                errors.name = "El nombre es muy corto!";
            }
            return errors;
        }
    })(NewBoardForm)
);
