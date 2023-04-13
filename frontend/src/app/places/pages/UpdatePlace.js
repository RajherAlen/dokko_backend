import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Input, Textarea } from "shared/components";
import { DUMMY_PLACES } from "shared/helper";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "shared/util";
import { useForm } from "shared/hooks";

const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams().placeId;
    const currenPlace = DUMMY_PLACES.find((place) => place.id === placeId);

    const initialInput = {
        title: {
            value: "",
            isValid: false,
        },
        description: {
            value: "",
            isValid: false,
        },
    };

    const [formState, handleInput, setFormData] = useForm(initialInput, true);

    useEffect(() => {
        if (currenPlace) {
            setFormData(
                {
                    title: {
                        value: currenPlace.title,
                        isValid: true,
                    },
                    description: {
                        value: currenPlace.description,
                        isValid: true,
                    },
                },
                true
            );
        }

        setIsLoading(false);
    }, [setFormData, currenPlace]);

    if (!currenPlace) {
        return (
            <div className="place-list u-f--center">
                <Card className="card--med">
                    <h2>No places found. Maybe create one?</h2>
                    <Button to="/places/new">Share Place</Button>
                </Card>
            </div>
        );
    }

    return isLoading ? (
        <div>Loading</div>
    ) : (
        <form className="place-form">
            <Input
                type="text"
                id={"title"}
                label="Title"
                onInput={handleInput}
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />
            <Textarea
                type="text"
                id={"description"}
                label="Description"
                onInput={handleInput}
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)."
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
            />

            <Button type="submit" disabled={!formState.isValid}>
                Update Place
            </Button>
        </form>
    );
};

export default UpdatePlace;
