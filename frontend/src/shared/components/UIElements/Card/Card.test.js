/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';

it('should render card component', () => {
  expect(shallow(<Card />)).toMatchSnapshot();
});
