import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css'; 

import {
    SuccessBtn,
} from '../../Buttons';

const ListItem = ({}) => (
    <div>
        <SuccessBtn text="Item" />
    </div>
);

export default connect(
    state => ({})
)(ListItem);