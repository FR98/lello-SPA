import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css'; 

import {
    SuccessBtn,
} from '../Buttons';
import ListItem from './ListItem';

const OptionsList = ({ title, items }) => (
    <div>
        <h2>{ title }</h2>
        <div>
            {
                items.map(item => (
                    <ListItem />
                ))
            }
        </div>
    </div>
);

export default connect(
    state => ({
        state: state,
    })
)(OptionsList);