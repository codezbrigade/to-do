import React from 'react';
import { shallow } from 'enzyme';

import AppRating from '../../AnyTODO/components/AppRating';

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<AppRating {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

const findTestAttr = (wrapper, attr) =>
  wrapper.find(`[dataTest='${attr}']`);

// console.log(setup().state().rating);

describe('AppRating modal basic tests', () => {
  test('if selectedHeader prop is not completed', () => {
    const wrapper = setup();
    // expect(wrapper).toSn;
  });
});