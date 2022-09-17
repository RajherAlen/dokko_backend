export const handleChange = (event, dispatch, validators) => {
	dispatch({
		type: "CHANGE",
		value: event.target.value,
		validators: validators
	});
};

export const handleBlur = (dispatch) => {
	dispatch({
		type: "TOUCH"
	});
};
