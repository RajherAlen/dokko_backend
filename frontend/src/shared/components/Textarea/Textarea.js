import React, { useReducer, useEffect } from "react";
import { inputReducer, handleChange, handleBlur } from "shared/util";

const Textarea = (props) => {
    const {
        label,
        id,
        onInput,
        initialValue = "",
        initialValid = false,
        placeholder,
        errorText,
        validators,
        rows = 5,
    } = props;

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initialValue,
        isValid: initialValid,
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
