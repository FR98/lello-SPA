import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css'; 

import OptionsList from '../OptionsList';

import * as selectors from '../../reducers';


const Sidebar = ({ data }) => (
    <div className="sidebar">
        {console.log(data)}
        <OptionsList title="TEAMS" items={[1, 2, 3]}/>
    </div>
);

export default connect(
    state => ({
        data: state,
    })
)(Sidebar);