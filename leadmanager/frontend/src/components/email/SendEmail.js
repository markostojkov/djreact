import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendEmail } from "../../actions/emails";

class SendEmail extends Component {
	state = {
		email: this.props.email.email,
		subject: "",
		message: ""
	};
	onChange = e => this.setState({ [e.target.name]: e.target.value });

	onSubmit = e => {
		e.preventDefault();
		this.props.sendEmail(this.state);
		this.props.onSubmit(e);
	};

	render() {
		if (!this.props.showModal) {
			return null;
		}
		const { email, subject, message } = this.state;
		return (
			<div className="card card-body mt-4 mb-4">
				<h2>Send Email</h2>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Email</label>
						<input
							className="form-control"
							type="email"
							name="email"
							onChange={this.onChange}
							value={email}
							disabled
						/>
					</div>
					<div className="form-group">
						<label>Subject</label>
						<input
							className="form-control"
							type="text"
							name="subject"
							onChange={this.onChange}
							value={subject}
						/>
					</div>
					<div className="form-group">
						<label>Message</label>
						<textarea
							className="form-control"
							type="text"
							name="message"
							onChange={this.onChange}
							value={message}
						/>
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-success">
							Submit
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default connect(null, {
	sendEmail
})(SendEmail);
