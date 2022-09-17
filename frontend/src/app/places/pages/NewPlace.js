import React from "react";
import { Input } from "shared/components";
import { VALIDATOR_REQUIRE } from "shared/util";

const NewPlace = () => {
	return (
		<form className="place-form">
			<Input
				type="text"
				id={"Title"}
				label="Title"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid title"
			/>
		</form>
	);
};

export default NewPlace;
