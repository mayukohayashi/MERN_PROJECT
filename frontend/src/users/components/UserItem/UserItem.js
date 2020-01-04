import React from 'react';

import './UserItem.css';

import Avatar from '../../../shared/components/UIElements/Avatar/Avatar';

const UserItem = props => {
  return (
    <li className="user-item">
      <div className="user-item__content">
        <div className="user-item__image">
          <Avatar image={props.image} alt={props.name} />
        </div>
        <div className="user-item__info">
          <h2>{props.name}</h2>
          <h3>
            {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
          </h3>
        </div>
      </div>
    </li>
  );
};

export default UserItem;
