import React from 'react';
import { connect } from 'react-redux';

import './styles.css'; 

import TeamsList from '../TeamsList';


const Sidebar = ({}) => (
    <div className="sidebar">
        <TeamsList />
    </div>
);

export default connect(
    state => ({})
)(Sidebar);