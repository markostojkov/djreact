import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Login from "../accounts/Login";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
	const finalComponent = auth.isAuthenticated ? Component : Login;

	return <Route {...rest} component={finalComponent} />;
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
