import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Login from "../accounts/Login";
import Loading from "./Loading";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
	var finalComponent;
	if (auth.isAuthenticated) finalComponent = Component;
	else if (auth.isLoading) finalComponent = Loading;
	else finalComponent = Login;

	return <Route {...rest} component={finalComponent} />;
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
