import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { changeUser, loadUser } from "../../actions/auth";
import { createMessage } from "../../actions/messages";

class ChangeUser extends Component {
	state = {
		username: this.props.auth.user.username,
		email: this.props.auth.user.email
	};

	static propTypes = {
		auth: PropTypes.object.isRequired,
		changeUser: PropTypes.func.isRequired,
		createMessage: PropTypes.func.isRequired
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	onSubmit = e => {
		e.preventDefault();

		const { username, email } = this.state;
		this.props.changeUser(username, email);
	};

	render() {
		const { username, email } = this.state;
		return (
			<div className="col-6 ml-auto mt-3">
				<div className="card card-body">
					<h2>Edit User</h2>
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label>Username</label>
							<input
								className="form-control"
								type="text"
								name="username"
								onChange={this.onChange}
								value={username}
							/>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input
								className="form-control"
								type="email"
								name="email"
								onChange={this.onChange}
								value={email}
							/>
						</div>
						<div className="form-group">
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, {
	changeUser,
	createMessage,
	loadUser
})(ChangeUser);
