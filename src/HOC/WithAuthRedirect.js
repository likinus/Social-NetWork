import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

let mapStateToPropsForRedirect = (state) => ({
  isAuth: state.auth.isAuth,
});

export const withAuthRedirect = (Component) => {
  const RredirectComponent = (props) => {
    if (!props.isAuth) return <Redirect to="login" />;

    return <Component {...props} />;
  };

  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RredirectComponent);

  return ConnectedAuthRedirectComponent;
};
