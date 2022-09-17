import React, { useReducer } from "react";
import { inputReducer, handleChange, handleBlur } from "shared/util";

const Textarea = (props) => {
	const { label, id, placeholder, errorText, validators, rows = 5 } = props;

	const [inputState, dispatch] = useReducer(inputReducer, {
		value: "",
		isValid: false,
		isTouched: false
	});

	const handleInputChange = (event) => {
		handleChange(event, dispatch, validators);
	};

	const handleInputBlur = () => {
		handleBlur(dispatch);
	};

	return (
		<div
			className={`form-control ${
				!inputState.isValid && inputState.isTouched
					? "form-control--invalid"
					: ""
			}`}
		>
			<label htmlFor={id}>{label}</label>
			<textarea
				id={id}
				rows={rows}
				placeholder={placeholder}
				onBlur={handleInputBlur}
				onChange={handleInputChange}
				value={inputState.value}
			/>
			{!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
		</div>
	);
};

export default Textarea;
