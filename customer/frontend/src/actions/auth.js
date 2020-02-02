import axios from "axios";
import { returnErrors, createMessage } from "./messages";

import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	CHANGE_PASSWORD,
	CHANGE_USER
} from "./types";

export const loadUser = () => (dispatch, getState) => {
	dispatch({ type: USER_LOADING });

	axios
		.get("/api/auth/user", tokenConfig(getState))
		.then(res => {
			dispatch({
				type: USER_LOADED,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR
			});
		});
};

export const login = (username, password) => dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	const body = JSON.stringify({ username, password });

	axios
		.post("/api/auth/login", body, config)
		.then(res => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: LOGIN_FAIL
			});
		});
};

export const register = ({ username, password, email }) => dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	const body = JSON.stringify({ username, email, password });

	axios
		.post("/api/auth/register", body, config)
		.then(res => {
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: REGISTER_FAIL
			});
		});
};

export const changePassword = (old_password, new_password) => (
	dispatch,
	getState
) => {
	const body = JSON.stringify({ old_password, new_password });

	axios
		.post("api/auth/change-password", body, tokenConfig(getState))
		.then(res => {
			dispatch(
				createMessage({
					successPasswordChange: "Successfully changed passwords!"
				})
			);
			dispatch({
				type: CHANGE_PASSWORD,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const changeUser = (username, email) => (dispatch, getState) => {
	const body = JSON.stringify({ username, email });

	axios
		.post("api/auth/user", body, tokenConfig(getState))
		.then(res => {
			dispatch(
				createMessage({
					successUserChange: "Successfully changed user data!"
				})
			);
			dispatch({
				type: CHANGE_USER,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const logout = () => (dispatch, getState) => {
	axios
		.post("/api/auth/logout/", null, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: LOGOUT_SUCCESS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR
			});
		});
};

//SETUP CONFIG WITH TOKEN - HELPER FUNC
export const tokenConfig = getState => {
	const token = getState().auth.token;

	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	if (token) {
		config.headers["Authorization"] = `Token ${token}`;
	}
	return config;
};
