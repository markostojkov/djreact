import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editEmail } from "../../actions/emails";

class EditEmail extends Component {
	state = {
		id: this.props.email.id,
		email: this.props.email.email,
		name: this.props.email.name,
		phone_number: this.props.email.phone_number,
		owner: this.props.email.owner
	};
	static propTypes = {
		editEmail: PropTypes.func.isRequired
	};
	onChange = e => this.setState({ [e.target.name]: e.target.value });

	onSubmit = e => {
		e.preventDefault();
		this.props.editEmail(this.state, this.props.email.id);
		this.props.onSubmit(e);
	};

	render() {
		if (!this.props.showModal) {
			return null;
		}
		const { email, name, phone_number } = this.state;
		return (
			<div className="card card-body mt-4 mb-4">
				<h2>Edit Email</h2>
				<form onSubmit={this.onSubmit}>
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
						<label>Name</label>
						<input
							className="form-control"
							type="text"
							name="name"
							onChange={this.onChange}
							value={name}
						/>
					</div>
					<div className="form-group">
						<label>Phone number</label>
						<textarea
							className="form-control"
							type="text"
							name="phone_number"
							onChange={this.onChange}
							value={phone_number}
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
	editEmail
})(EditEmail);
