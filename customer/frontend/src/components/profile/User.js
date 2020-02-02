import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser } from "../../actions/auth";
import { getLeads } from "../../actions/leads";

class User extends Component {
	static propTypes = {
		getLeads: PropTypes.func.isRequired,
		loadUser: PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired,
		leads: PropTypes.array.isRequired
	};

	componentDidMount() {
		this.props.getLeads();
	}

	render() {
		const { user } = this.props.auth;
		return (
			<div className="col-6">
				<div className="card">
					<div className="card-body">
						<div className="row">
							<div className="col-12 col-lg-8 col-md-6">
								<h3 className="mb-0 text-truncated">
									{user ? user.username : ""}
								</h3>
								<p className="lead">{user ? user.email : ""}</p>
								<p>
									I love to read, hang out with friends, watch
									football, listen to music, and learn new
									things.
								</p>
							</div>
							<div className="col-12 col-lg-4 col-md-6 text-center">
								<img
									src="https://robohash.org/68.186.255.198.png"
									alt=""
									className="mx-auto rounded-circle img-fluid"
								/>
							</div>
							<div className="col-12 col-lg-4">
								<h3 className="mb-0">
									{this.props.leads
										? this.props.leads.length
										: "0"}
								</h3>
								<small>Leads</small>
								<button className="btn btn-block btn-outline-success">
									<span className="fa fa-plus-circle"></span>{" "}
									Follow
								</button>
							</div>
							<div className="col-12 col-lg-4">
								<h3 className="mb-0">245</h3>
								<small>Following</small>
								<button className="btn btn-outline-info btn-block">
									<span className="fa fa-user"></span> View
									Profile
								</button>
							</div>
							<div className="col-12 col-lg-4">
								<h3 className="mb-0">43</h3>
								<small>Snippets</small>
								<button
									type="button"
									className="btn btn-outline-primary btn-block"
								>
									<span className="fa fa-gear"></span> Options
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	leads: state.leads.leads
});

export default connect(mapStateToProps, { getLeads, loadUser })(User);
