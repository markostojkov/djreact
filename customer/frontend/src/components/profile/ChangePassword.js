import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { changePassword } from "../../actions/auth";
import { createMessage } from "../../actions/messages";

class ChangePassword extends Component {
	state = {
		password: "",
		new_password: "",
		confirm_password: ""
	};

	static propTypes = {
		changePassword: PropTypes.func.isRequired,
		createMessage: PropTypes.func.isRequired
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	onSubmit = e => {
		e.preventDefault();

		const { password, new_password, confirm_password } = this.state;
		if (new_password !== confirm_password) {
			this.props.createMessage({
				passwordNotMatch: "Passwords do not match!"
			});
		} else {
			this.props.changePassword(password, new_password);
			this.setState({
				password: "",
				new_password: "",
				confirm_password: ""
			});
		}
	};

	render() {
		const { password, new_password, confirm_password } = this.state;

		return (
			<div className="col-6">
				<div className="card card-body">
					<h2>Change Password</h2>
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label>Current Password</label>
							<input
								className="form-control"
								type="password"
								name="password"
								onChange={this.onChange}
								value={password}
							/>
						</div>
						<div className="form-group">
							<label>New Password</label>
							<input
								className="form-control"
								type="password"
								name="new_password"
								onChange={this.onChange}
								value={new_password}
							/>
						</div>
						<div className="form-group">
							<label>Confirm new password</label>
							<input
								className="form-control"
								type="password"
								name="confirm_password"
								onChange={this.onChange}
								value={confirm_password}
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

export default connect(null, { changePassword, createMessage })(ChangePassword);
