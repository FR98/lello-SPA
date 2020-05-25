import React from 'react';
import { connect } from 'react-redux';

import './styles.css'; 

import TeamsList from '../TeamsList';


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