import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import moment from 'moment';

import './styles.css'; 

import * as selectors from '../../../reducers';

import {GeneralBtn} from '../../Buttons';

const Card = ({ data }) => {
    const { path, url } = useRouteMatch();
    return(
        <Link to={`${path}/cards/${data.id}`}>
            <div className="card-container">
                <div className="card-superiorContainer">
                    <label className="card-title">
                        {data.title}
                    </label>
                    <label>
                        #{data.number}
                    </label>
                </div>
                <div className="card-inferiorContainer">
                    <label>
                        {
                            data.deadline ? moment(data.deadline).format('DD/MM/YYYY') : "" 
                        }
                    </label>
                    <label>
                        {data.hours_done} | {data.hours_estimated}
                    </label>
                    <label>
                        {
                            data.assigned_to.length === 0 && (
                                <p>{ '' }</p>
                            )
                        }
                        {
                            data.assigned_to.length > 0  && (
                                data.assigned_to.map(({ member_id }) => <div>member_id</div>)        
                            )
                        }
                    </label>
                </div>
            </div>
        </Link>
    );
}

export default connect(
    (state, {id}) => ({
        data: selectors.getCard(state, id),
    })
)(Card);