import { validate } from "./validators";

const inputReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE":
			return {
				...state,
				value: action.value,
				isValid: validate(action.value, action.validators)
			};
		case "TOUCH":
			return {
				...state,
				isTouched: true
			};
		default:
			return state;
	}
};

export default inputReducer;
