import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Field, reduxForm, reset } from 'redux-form';

import * as actions from '../../../actions/cards';
import { GeneralBtn } from '../../Buttons';
import { RenderInput } from '../../FormFields';

const NewCardForm = ({ handleSubmit }) => (
    <form onSubmit={ handleSubmit }>
        <div className="div-display-column">
            <Field
                name='name'
                type='text'
                placeholder="Nombre de la nueva tarjeta"
                component={ RenderInput }
            />
            <GeneralBtn 
                text={"+ Añadir otra tarjeta"}
                type={'submit'}
            />
        </div>
    </form>
);

export default connect(
    state => ({}),
)(
    reduxForm({
        form: 'addCard',
        onSubmit({ name }, dispatch) {
            dispatch(
                actions.startAddingCard({
                    id: uuid(),
                    name,
                }),
            );
            dispatch(reset('addCard'));
        },
        validate(values) {
            const errors = {};
            if (values.name && values.name.length > 15) {
                errors.name = "¡El nombre es muy largo!";
            } else if (values.name && values.name.length < 2){
                errors.name = "¡El nombre es muy corto!";
            }
            return errors;
        }
    })(NewCardForm)
);
