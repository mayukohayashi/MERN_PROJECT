import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../../places/components/PlaceList/PlaceList';

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

const UserPlaces = () => {
  const { userId } = useParams();
  // const userId = userParams().userId

  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);

  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
