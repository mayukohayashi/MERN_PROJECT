import React from 'react';

import UsersList from '../components/UsersList/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Mayuko Hayashi',
      image: 'https://image.flaticon.com/icons/png/512/64/64572.png',
      places: 3
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;
