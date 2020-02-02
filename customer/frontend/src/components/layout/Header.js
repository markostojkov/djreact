import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

class Header extends Component {
	static propTypes = {
		auth: PropTypes.object.isRequired,
		logout: PropTypes.func.isRequired
	};

	render() {
		const { isAuthenticated, user } = this.props.auth;

		const authLinks = (
			<ul className="navbar-nav ml-auto mt-2 mt-lg-0">
				<Link to="/user" className="nav-link">
					<strong>{user ? user.username : ""}</strong>
				</Link>
				<li className="nav-item">
					<button
						onClick={this.props.logout}
						className="nav-link btn btn-info btn-info btn-sm text-light"
					>
						Logout
					</button>
				</li>
			</ul>
		);

		const guestLinks = (
			<ul className="navbar-nav ml-auto mt-2 mt-lg-0">
				<li className="nav-item">
					<Link to="/register" className="nav-link">
						Register
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/login" className="nav-link">
						Login
					</Link>
				</li>
			</ul>
		);

		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
				<div className="container">
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarTogglerDemo01"
						aria-controls="navbarTogglerDemo01"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div
						className="collapse navbar-collapse"
						id="navbarTogglerDemo01"
					>
						<a className="navbar-brand" href="#">
							Customers
						</a>
						<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
							<li className="nav-item">
								<Link to="/email" className="nav-link">
									Email
								</Link>
							</li>
						</ul>
					</div>
					{isAuthenticated ? authLinks : guestLinks}
				</div>
			</nav>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
