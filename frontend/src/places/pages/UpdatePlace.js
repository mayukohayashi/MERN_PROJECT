import React from 'react';
import { useParams } from 'react-router-dom';

import './PlaceForm.css';

import Input from '../../shared/components/FormElements/Input/Input';
import Button from '../../shared/components/FormElements/Button/Button';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/components/util/validators';

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
    title: '通天閣',
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
  const { placeId } = useParams();

  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not found place yet!</h2>
      </div>
    );
  }

  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={() => {}}
        value={identifiedPlace.title}
        valid={true}
      />
      <Input
        id="description"
        element="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description. (at least 5 characters)"
        onInput={() => {}}
        value={identifiedPlace.description}
        valid={true}
      />
      <Button type="submit" disabled={true}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
