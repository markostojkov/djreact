import { CREATE_MESSAGE, GET_ERRORS } from "./types";

//CREATE MESSAGE ACTION
export const createMessage = msg => {
	return {
		type: CREATE_MESSAGE,
		payload: msg
	};
};

// RETURN ERRORS ACTION
export const returnErrors = (msg, status) => {
	return {
		type: GET_ERRORS,
		payload: { msg, status }
	};
};
