import React from 'react';
import renderer from 'react-test-renderer';
import Heading from '../../AnyTODO/components/Heading';


describe('Heading component basics', () => {
  const tree = renderer.create(<Heading />).toJSON();

  beforeEach(() => {
    /* Runs before each test */
    console.log('_____________________');
  });

  test('renders correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  test('Should have one parrent node and that should be View', () => {
    expect(tree.type).toEqual('View');
    expect(tree.type).toEqual('View');
  });

  test('Should have Heading text', () => {
    expect(tree.type).toEqual('View');
  });

  console.log(JSON.stringify(tree));
});