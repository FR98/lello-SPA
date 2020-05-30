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

const Cardlist = ({ data, cards = [], isLoading }) => {
    return (
        <div className="cardlist-container">
            <div className="header-cardlist">
                <div className="carlist-title">
                    <label>
                        {data.name}
                    </label>
                </div>
                <div className="cardlist-hours">
                    <label className="label-cardlist-hours">
                        {data.hours_done} | {data.hours_estimated}
                    </label>
                    <DangerBtn text={ "x" } action={ cardListActions.startRemovingList(data.id) } />
                </div>
            </div>
            <div>
                {
                    cards.length === 0 && !isLoading && (
                        <p>{ 'No hay' }</p>
                    )
                }
                {
                    cards.length > 0 && !isLoading && (
                        cards.map(({ id }) => <Card key={id} id={id} />)        
                    )
                }
            </div>
            <NewCardForm/>
        </div>
    );
}

export default connect(
    (state, {id}) => ({
        data: selectors.getList(state, id),
        cards: selectors.getListCards(state, id),
    })
)(Cardlist);