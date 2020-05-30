import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css'; 
import * as selectors from '../../../reducers';
import * as actions from '../../../actions/cards';
import * as cardListActions from '../../../actions/lists';

import Card from '../Card';
import NewCardForm from '../../Board/NewCardForm'
import {
    GeneralBtn,
    DangerBtn,
} from '../../Buttons';

const Cardlist = ({ data, cards = [] }) => (
    <div className="cardlist-container">
        <div className="header-cardlist">
            <div className="carlist-title">
                <label>
                    { data.name }
                </label>
            </div>
            <div className="cardlist-hours">
                <label className="label-cardlist-hours">
                    { data.hours_done } | { data.hours_estimated }
                </label>
                <DangerBtn text={ "x" } action={ cardListActions.startRemovingList( data.id ) } />
            </div>
        </div>
        <div>
            {
                data.card_set.length === 0 && (
                    <p>{ 'No hay' }</p>
                )
            }
            {
                data.card_set.length > 0 && (
                    data.card_set.map(id => <Card key={ id } id={ id } />)
                )
                
            }
        </div>
        <NewCardForm listId={ data.id } />
    </div>
);

export default connect(
    (state, {id}) => ({
        data: selectors.getList(state, id),
        // cards: selectors.getListCards(state, id),
    })
)(Cardlist);