import React, { useReducer } from "react";
import { inputReducer, handleChange, handleBlur } from "shared/util";

const Input = (props) => {
	const { label, id, type, placeholder, errorText, validators } = props;

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
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				onBlur={handleInputBlur}
				onChange={handleInputChange}
				value={inputState.value}
			/>
			{!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
		</div>
	);
};

export default Input;
