/**
 * @format
 */

import React from 'react';
// import App from '../App';
import Headers from '../src/components/Headers';

import {shallow} from 'enzyme';

const wrapper = shallow(<Headers />);

it('renders correctly', () => {
  expect(wrapper).toMatchInlineSnapshot(`
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={
          Object {
            "flexDirection": "row",
            "overflow": "visible",
            "width": "100%",
          }
        }
      >
        <SectionHeader
          idx={0}
          key="0"
          string="Today"
        />
        <SectionHeader
          idx={1}
          key="1"
          string="Tomorrow"
        />
        <SectionHeader
          idx={2}
          key="2"
          string="Upcoming"
        />
        <SectionHeader
          idx={3}
          key="3"
          string="Completed"
        />
      </ScrollView>
    </View>
  `);
});
