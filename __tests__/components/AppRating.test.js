import React from 'react';
import { shallow } from 'enzyme';

import AppRating from '../../AnyTODO/components/AppRating';
import { asserts } from '../../AnyTODO/constants';

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<AppRating {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

const findTestAttr = (wrapper, attr) =>
  wrapper.find(`[dataTest='${attr}']`);

describe('AppRating modal basic tests', () => {
  const wrapper = setup();

  test('should have rating Title', () => {
    const component = findTestAttr(wrapper, 'title');
    expect(component.props().children).toBe('Your opinion matters to us !');
  });

  test('should have rating subtitle', () => {
    const component = findTestAttr(wrapper, 'subtitle');
    expect(component.props().children).toBe('Give us a quick review and helps us to improve ?');
  });

  test('should have rating LOGO', () => {
    const component = findTestAttr(wrapper, 'logo');
    expect(component.props().source).toBe(asserts.rateHeadLogo);
  });

});