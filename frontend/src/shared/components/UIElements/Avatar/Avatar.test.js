/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Avatar from './Avatar';

it('should render Avatar component', () => {
  expect(shallow(<Avatar />)).toMatchSnapshot();
});
