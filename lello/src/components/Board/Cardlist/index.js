import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css'; 
import * as selectors from '../../../reducers';
import * as actions from '../../../actions/cards';

import {GeneralBtn} from '../../Buttons';
import Card from '../Card';

const Cardlist = ({ data, cards, isLoading, onLoad }) => {
    useEffect(onLoad, []);
    return (
        <div className="cardlist-container">
            <div className="header-cardlist">
                <div className="carlist-title">
                    <label>
                        {data.name}
                    </label>
                </div>
                <div className="cardlist-hours">
                    <label>
                        {data.hours_done} | {data.hours_estimated}
                    </label>
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
            <GeneralBtn text="+ Añadir otra tarjeta"/>
        </div>
    );
}

export default connect(
    (state, {id}) => ({
        data: selectors.getList(state, id),
        cards: selectors.getCards(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingCards());
        }
    }),
)(Cardlist);