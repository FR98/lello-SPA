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
    (state, { text, action, actions }) => ({
      text: text,
      action: action,
      actions: actions,
    }),
    dispatch => ({
        onClick(action, actions) {
            if (action) {
              dispatch(action);
            } else if (actions) {
              actions.map(action => dispatch(action));
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
        dispatchProps.onClick(stateProps.action, stateProps.actions);
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
  (state, { text, action, actions }) => ({
    text: text,
    action: action,
    actions: actions,
  }),
  dispatch => ({
      onClick(action, actions) {
          if (action) {
            dispatch(action);
          } else if (actions) {
            actions.map(action => dispatch(action));
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
      dispatchProps.onClick(stateProps.action, stateProps.actions);
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
  (state, { text, action, actions }) => ({
    text: text,
    action: action,
    actions: actions,
  }),
  dispatch => ({
      onClick(action, actions) {
          if (action) {
            dispatch(action);
          } else if (actions) {
            actions.map(action => dispatch(action));
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
      dispatchProps.onClick(stateProps.action, stateProps.actions);
    },
  }),
)(DangerButton);
