import React from 'react';
import { Input, Textarea, Button } from 'shared/components';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from 'shared/util';
import { useForm } from 'shared/hooks';

const initialInputs = {
    title: {
        value: '',
        isValid: false,
    },
    description: {
        value: '',
        isValid: false,
    },
    address: {
        value: '',
        isValid: false,
    },
};

const NewPlace = () => {
    const [formState, handleInput] = useForm(initialInputs, false);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(formState);
    };

    return (
        <form className='place-form' onSubmit={handleFormSubmit}>
            <Input
                type='text'
                id={'title'}
                label='Title'
                onInput={handleInput}
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter a valid title'
            />
            <Textarea
                type='text'
                id={'description'}
                label='Description'
                onInput={handleInput}
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText='Please enter a valid description (at least 5 characters).'
            />
            <Input
                type='text'
                id={'address'}
                label='Address'
                onInput={handleInput}
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter a valid address'
            />
            <Button type='submit' disabled={!formState.isValid}>
                Add Place
            </Button>
        </form>
    );
};

export default NewPlace;
