import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSingleEmail } from "../../actions/emails";
import EditEmail from "./EditEmail";
import SendEmail from "./SendEmail";

class DetailEmail extends Component {
	state = {
		showEditModal: false,
		showEmailModal: false
	};

	static propTypes = {
		email: PropTypes.object.isRequired,
		getSingleEmail: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.props.getSingleEmail(this.props.match.params.id);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.props.getSingleEmail(this.props.match.params.id);
		}
	}

	openEdit = () => {
		this.setState({ showEditModal: !this.state.showEditModal });
	};
	openEmail = () => {
		this.setState({ showEmailModal: !this.state.showEmailModal });
	};

	render() {
		const { email, name, phone_number } = this.props.email;
		return (
			<Fragment>
				<div className="card mt-4">
					<div className="card-header">Email: {email}</div>
					<div className="card-body">
						<h5 className="card-title">Name: {name}</h5>
						<p className="card-text">
							Phone number: {phone_number}
						</p>
						<button
							onClick={this.openEdit}
							className="btn btn-primary mr-1"
						>
							{!this.state.showEditModal ? "Edit" : "Close"}
						</button>
						<button
							onClick={this.openEmail}
							className="btn btn-secondary mr-1"
						>
							Send email
						</button>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						{this.state.showEditModal ? (
							<EditEmail
								showModal={this.state.showEditModal}
								email={this.props.email}
								onSubmit={this.openEdit}
							/>
						) : (
							<Fragment />
						)}
					</div>
					<div className="col-sm-6">
						{this.state.showEmailModal ? (
							<SendEmail
								showModal={this.state.showEmailModal}
								email={this.props.email}
								onSubmit={this.openEmail}
							/>
						) : (
							<Fragment />
						)}
					</div>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	email: state.emails.email
});

export default connect(mapStateToProps, {
	getSingleEmail
})(DetailEmail);
