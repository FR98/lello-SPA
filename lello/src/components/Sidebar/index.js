import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css'; 

import TeamsList from '../TeamsList';

import * as selectors from '../../reducers';


const Sidebar = ({ data }) => (
    <div className="sidebar">
        {console.log(data)}
        <TeamsList />
    </div>
);

export default connect(
    state => ({
        data: state,
    })
)(Sidebar);