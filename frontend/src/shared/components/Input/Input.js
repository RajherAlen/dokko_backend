import React, { useReducer, useEffect } from "react";
import { inputReducer, handleChange, handleBlur } from "shared/util";

const Input = (props) => {
    const { label, id, type, placeholder, errorText, validators, onInput } =
        props;

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: "",
        isValid: false,
        isTouched: false,
    });

    const handleInputChange = (event) => {
        handleChange(event, dispatch, validators);
    };

    const handleInputBlur = () => {
        handleBlur(dispatch);
    };

    useEffect(() => {
        onInput(id, inputState.value, inputState.isValid);
    }, [id, inputState.value, inputState.isValid, onInput]);

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
