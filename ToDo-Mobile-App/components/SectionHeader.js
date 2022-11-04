import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../constants';

const SectionHeader = ({ string, imageUrl }) => {
  return (
    <View style={styles.listHeaderContainer}>
      <View style={styles.listHeader}>
        <Text style={styles.text}>
          {string}
        </Text>
        {
          imageUrl && <Image source={imageUrl}
            style={{ width: 15, height: 15 }}
            resizeMode='contain'
          />
        }
      </View>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  listHeaderContainer: {
    width: '100%',
    backgroundColor: COLORS.settingsBackground,
    paddingVertical: 5,

  },
  listHeader: {
    width: 100,
    backgroundColor: '#fff',
    paddingVertical: 2,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    padding: 5,
  }
})