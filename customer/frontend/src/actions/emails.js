import axios from "axios";

import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
	GET_EMAILS,
	DELETE_EMAIL,
	ADD_EMAIL,
	GET_SINGLE_EMAIL,
	EDIT_EMAIL
} from "./types";

//GET EMAILS ACTION
export const getEmails = () => (dispatch, getState) => {
	axios
		.get("/api/emails/", tokenConfig(getState))
		.then(res => {
			dispatch({
				type: GET_EMAILS,
				payload: res.data
			});
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const getSingleEmail = id => (dispatch, getState) => {
	axios
		.get(`/api/emails/${id}`, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: GET_SINGLE_EMAIL,
				payload: res.data
			});
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const editEmail = (email, id) => (dispatch, getState) => {
	axios
		.put(`/api/emails/${id}/`, email, tokenConfig(getState))
		.then(res => {
			dispatch(createMessage({ editEmail: "Email edited" }));
			dispatch({
				type: EDIT_EMAIL,
				payload: res.data
			});
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

//DELETE EMAIL ACTION
export const deleteEmail = id => (dispatch, getState) => {
	axios
		.delete(`/api/emails/${id}/`, tokenConfig(getState))
		.then(res => {
			dispatch(createMessage({ deleteEmail: "Email Deleted" }));
			dispatch({
				type: DELETE_EMAIL,
				payload: id
			});
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

//ADD EMAIL
export const addEmail = email => (dispatch, getState) => {
	axios
		.post("/api/emails/", email, tokenConfig(getState))
		.then(res => {
			dispatch(createMessage({ addEmail: "Email Added" }));
			dispatch({
				type: ADD_EMAIL,
				payload: res.data
			});
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const sendEmail = email => (dispatch, getState) => {
	axios
		.post("/api/emails/send-email", email, tokenConfig(getState))
		.then(res => {
			dispatch(createMessage({ sendEmail: "Email sent!" }));
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
