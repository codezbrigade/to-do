import React from 'react';
import {Text, View} from 'react-native';

import {styles} from './Heading.styles';

const Heading = ({styleProps}) => (
  <View style={[styles.headingContainer, styleProps]}>
    <Text style={styles.heading}>Any TO_DO</Text>
  </View>
);

export default Heading;
