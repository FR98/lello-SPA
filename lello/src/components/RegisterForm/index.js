import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Field, reduxForm, reset } from 'redux-form';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
    useParams
} from "react-router-dom";

import * as selectors from '../../reducers';
import * as actions from '../../actions/users';

import { RenderInput } from '../FormFields';
import { GeneralBtn } from '../Buttons';
import './styles.css'; 


const RegisterForm = ({ handleSubmit }) => (
    <form onSubmit={ handleSubmit }>
        <div className="display-all">
            <div className="div-display-column-register">
                <h2>Registro</h2>

                <label className="label-register">Username</label>
                <Field
                    name='username'
                    type="text"
                    placeholder="Username"
                    component={ RenderInput }
                    className="register-input"
                />
                <label>Gender</label>
                <Field
                    name='gender'
                    type="text"
                    placeholder="Gender"
                    component={ RenderInput }
                    className="register-input"
                />
                <label>Phone</label>
                <Field
                    name='phone'
                    type="text"
                    placeholder="Phone"
                    component={ RenderInput }
                    className="register-input"
                />
                <label>Birth Date (YYYY-MM-DD)</label>
                <Field
                    name='birthdate'
                    type="text"
                    placeholder="Birth Date"
                    component={ RenderInput }
                    className="register-input"
                />
                <label>Password</label>
                <Field
                    name='password'
                    type="password"
                    placeholder="Password"
                    component={ RenderInput }
                    className="register-input"
                />

                <GeneralBtn 
                    text={"Enviar"}
                    type={'submit'}
                />  
            </div>
        </div>
    </form>
);

export default connect(
    state => ({}),
)(
    reduxForm({
        form: 'addUser',
        onSubmit({ username, gender, phone, birthdate, password }, dispatch) {
            dispatch(
                actions.startAddingUser({
                    id: uuid(),
                    username,
                    password,
                    'userdetail_set': [{
                        gender,
                        phone,
                        birthdate
                    }]
                }),
            );
            dispatch(reset('addUser'));
        },
        validate(values) {
            const errors = {};
            if (values.gender && values.gender.length > 2) {
                errors.gender = "Ingrese M para masculino y F para femenino";
            } 
            if (values.phone  && values.phone.length > 8){
                errors.phone = "El numero telefonico no puede ser mayor a 8 digitos";
            }
            return errors;
        }
    })(RegisterForm)
);
