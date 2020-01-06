import React from 'react';

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
  return <PlaceList items={DUMMY_PLACES} />;
};

export default UserPlaces;
