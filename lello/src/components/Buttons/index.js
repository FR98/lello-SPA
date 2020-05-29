import React from 'react';
import { connect } from 'react-redux';

import './styles.css';


// General grey button ---
const GeneralButton = ({ onClick=null, text, type }) => (
    <button 
      className='general-button' 
      onClick={ onClick }
      type={ type }
    >
        { text }
    </button>
);

export const GeneralBtn = connect(
    (state, { text, action }) => ({
      text: text,
      action: action,
    }),
    dispatch => ({
        onClick(action) {
            if (action) {
              dispatch(action);
            } else {
              console.log("This button do nothing");
            };
        },
    }),
    (stateProps, dispatchProps, ownProps) => ({
      ...ownProps,
      ...stateProps,
      ...dispatchProps,
      onClick() {
        dispatchProps.onClick(stateProps.action)
      },
    }),
)(GeneralButton);


// Success green button ---
const SuccessButton = ({ onClick=null, text, type }) => (
  <button 
    className='success-button' 
    onClick={ onClick }
    type={ type }
  >
      { text }
  </button>
);

export const SuccessBtn = connect(
  (state, { text, action }) => ({
    text: text,
    action: action,
  }),
  dispatch => ({
      onClick(action) {
          if (action) {
            dispatch(action);
          } else {
            console.log("This button do nothing");
          };
      },
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onClick() {
      dispatchProps.onClick(stateProps.action)
    },
  }),
)(SuccessButton);


// Danger red button ---
const DangerButton = ({ onClick=null, text, type }) => (
  <button 
    className='danger-button' 
    onClick={ onClick }
    type={ type }
  >
      { text }
  </button>
);

export const DangerBtn = connect(
  (state, { text, action }) => ({
    text: text,
    action: action,
  }),
  dispatch => ({
      onClick(action) {
          if (action) {
            dispatch(action);
          } else {
            console.log("This button do nothing");
          };
      },
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onClick() {
      dispatchProps.onClick(stateProps.action)
    },
  }),
)(DangerButton);
