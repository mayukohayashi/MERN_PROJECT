import React, { useCallback } from 'react';

import './NewPlace.css';

import Input from '../../../shared/components/FormElements/Input/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../../shared/components/util/validators';

const NewPlace = () => {
  const titleInputHandler = useCallback((id, value, isValid) => {}, []);

  const descriptionInputHandler = useCallback((id, value, isValid) => {}, []);

  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={titleInputHandler}
      />

      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description at least 5 character"
        onInput={descriptionInputHandler}
      />
    </form>
  );
};

export default NewPlace;
