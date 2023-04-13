import React, { useContext, useState } from "react";
import { Input, Button, ErrorModal, Loader } from "shared/components";
import { AuthContext } from "shared/context";
import { useForm } from "shared/hooks";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "shared/util";

const initialLoginInputs = {
    email: {
        value: "",
        isValid: false,
    },
    password: {
        value: "",
        isValid: false,
    },
};

const Auth = () => {
    const { isLogged, login } = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [formState, handleInput, setFormData] = useForm(
        initialLoginInputs,
        false
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLogged) {
            console.log("first");
        } else {
            console.log("SECOND");
            try {
                setIsLoading(true);
                const res = await fetch(
                    "http://localhost:5000/api/users/signup",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: formState.inputs.username.value,
                            email: formState.inputs.email.value,
                            password: formState.inputs.password.value,
                        }),
                    }
                );

                const responseData = await res.json();

                if (!responseData.ok) {
                    throw new Error(responseData);
                }

                setIsLoading(false);
                login();
            } catch (err) {
                console.log(err);
                setIsLoading(false);
                setError(
                    err.message || "Something went wrong, please try again"
                );
            }
        }
    };

    const handleSwitchToSignUp = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    username: undefined,
                },
                formState.inputs.email.isValid &&
                    formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    username: {
                        value: "",
                        isValid: false,
                    },
                },
                false
            );
        }

        setIsLoginMode(!isLoginMode);
    };

    const errorHandler = () => {
        setError(null);
    };

    return (
        <div>
            <ErrorModal error={error} onClear={errorHandler} />

            {isLoading ? (
                <Loader asOverlay />
            ) : (
                <div className="place-form">
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        {!isLoginMode && (
                            <Input
                                type="text"
                                errorText="Please enter a name"
                                onInput={handleInput}
                                validators={[VALIDATOR_REQUIRE()]}
                                label="User Name"
                                id="username"
                            />
                        )}
                        <Input
                            type="text"
                            errorText="Invalid Email"
                            onInput={handleInput}
                            validators={[
                                VALIDATOR_REQUIRE(),
                                VALIDATOR_EMAIL(),
                            ]}
                            label="Email"
                            id="email"
                        />
                        <Input
                            type="password"
                            errorText="Invalid Password"
                            onInput={handleInput}
                            validators={[
                                VALIDATOR_REQUIRE(),
                                VALIDATOR_MINLENGTH(5),
                            ]}
                            label="Password"
                            id="password"
                        />
                        <Button type="submit" disabled={!formState.isValid}>
                            {!isLoginMode ? "Signup" : "Login"}
                        </Button>
                    </form>
                    <Button inverse onClick={handleSwitchToSignUp}>
                        Switch to {isLoginMode ? "Signup" : "Login"}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Auth;
