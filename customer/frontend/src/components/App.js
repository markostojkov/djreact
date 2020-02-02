import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
	HashRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import Dashboard from "./customers/Dashboard";
import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import EmailDashboard from "./email/EmailDashboard";
import DetailEmail from "./email/DetailEmail";
import PrivateRoute from "./common/PrivateRoute";
import ProfileDashboard from "./profile/ProfileDashboard";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";

const alertOptions = {
	timeout: 3000,
	position: "top center"
};

class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
	}

	render() {
		return (
			<Provider store={store}>
				<AlertProvider template={AlertTemplate} {...alertOptions}>
					<Router>
						<Fragment>
							<Header />
							<Alerts />
							<div className="container">
								<Switch>
									<PrivateRoute
										exact
										path="/"
										component={Dashboard}
									/>
									<PrivateRoute
										exact
										path="/email"
										component={EmailDashboard}
									/>
									<PrivateRoute
										path="/email/:id"
										component={DetailEmail}
									/>
									<PrivateRoute
										exact
										path="/user"
										component={ProfileDashboard}
									/>
									<Route
										exact
										path="/register"
										component={Register}
									/>
									<Route
										exact
										path="/login"
										component={Login}
									/>
								</Switch>
							</div>
						</Fragment>
					</Router>
				</AlertProvider>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("app"));