import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import AddYourTask from '../../AnyTODO/components/AddYourTask';
import { strings } from '../../AnyTODO/constants';

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<AddYourTask {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

const findTestAttr = (wrapper, attr) =>
  wrapper.find(`[dataTest='${attr}']`);

const props = {
  selectedHeader: strings.completed
};

describe('AddYourTask component basics', () => {
  test('if selectedHeader prop is not completed', () => {
    const wrapper = setup();
    const appComponent = findTestAttr(wrapper, 'others');
    expect(appComponent.length).toBe(2);
  });
  test('if selectedHeader prop is Completed', () => {
    const wrapper = setup(props);
    const appComponent = findTestAttr(wrapper, 'completed');
    expect(appComponent.length).toBe(1);
  });
  test('Snapshot testing', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});