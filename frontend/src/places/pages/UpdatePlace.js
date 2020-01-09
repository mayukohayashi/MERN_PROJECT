import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './PlaceForm.css';

import { useForm } from '../../shared/hooks/form-hook';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/components/util/validators';

import Input from '../../shared/components/FormElements/Input/Input';
import Button from '../../shared/components/FormElements/Button/Button';
import Card from '../../shared/components/UIElements//Card/Card';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: '通天閣',
    description: 'one of the osaka thing',
    imageUrl:
      'https://www.pakutaso.com/shared/img/thumb/AMizuho18116012_TP_V4.jpg',
    address: '556-0002 大阪府大阪市浪速区恵美須東１丁目１８−６',
    location: {
      lat: 34.6524992,
      lng: 135.5063058
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Tsutenkaku',
    description: 'one of the osaka thing',
    imageUrl:
      'https://www.pakutaso.com/shared/img/thumb/AMizuho18116012_TP_V4.jpg',
    address: '556-0002 大阪府大阪市浪速区恵美須東１丁目１８−６',
    location: {
      lat: 34.6524992,
      lng: 135.5063058
    },
    creator: 'u2'
  }
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { placeId } = useParams();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true
          },
          description: {
            value: identifiedPlace.description,
            isValid: false
          }
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not found place yet!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description. (at least 5 characters)"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
