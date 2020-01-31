import {
	GET_EMAILS,
	DELETE_EMAIL,
	ADD_EMAIL,
	GET_SINGLE_EMAIL,
	EDIT_EMAIL
} from "../actions/types";

const initialState = {
	emails: [],
	email: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_EMAILS:
			return {
				...state,
				emails: action.payload
			};
		case GET_SINGLE_EMAIL:
		case EDIT_EMAIL:
			return {
				...state,
				email: action.payload
			};
		case DELETE_EMAIL:
			return {
				...state,
				emails: state.emails.filter(
					email => email.id !== action.payload
				)
			};
		case ADD_EMAIL:
			return {
				...state,
				emails: [...state.emails, action.payload]
			};
		default: {
			return state;
		}
	}
}
