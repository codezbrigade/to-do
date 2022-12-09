import React from 'react';
import renderer from 'react-test-renderer';

import Heading from '../../AnyTODO/components/Heading';

describe('Heading component basics', () => {
  const tree = renderer.create(<Heading />).toJSON();

  test('renders correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  test('Should have one children', () => {
    expect(tree.children.length).toEqual(1);
  });

  test('Should have View as parent node', () => {
    expect(tree.type).toEqual('View');
  });

});