import React from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FONTS, categoryLogoMap, asserts, strings } from '../constants';

import { createAlert } from '../utils/Alert';

const Category = ({ category, handlePress, value }) => {

  const selectCategory = () => {
    if (category.name === strings.customize) {
      handlePress({ name: '', color: 'rgba(0,0,0,0)' });

    } else if (category.name === value) {
      handlePress({ name: '', color: 'rgba(0,0,0,0)' });
    } else {
      handlePress(category);
    }
  }

  return (
    <Pressable disabled={category.name === strings.customize} onPress={selectCategory}>
      <View style={[styles.categoryContainer, { opacity: category.name === strings.customize ? 0.2 : 1 }]}>
        <View style={{
          ...styles.categoryLogoContainer,
          backgroundColor: category.color,
          opacity: value === category.name ? 0.6 : 1
        }}>
          <Image
            source={categoryLogoMap[category.name]}
            resizeMode='contain'
            style={[{ width: 20, height: 20 }]}
          />
        </View>
        <Text style={styles.text}>{category.name}</Text>
        {
          value === category.name ? <Image source={asserts.selected}
            style={styles.selectedLogo}
            resizeMode='contain'
          /> : null
        }
      </View>
    </Pressable>
  );
};

export default Category;

const styles = StyleSheet.create({
  categoryContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal: ,
    // marginBottom: 2,
    padding: 2,
    // borderWidth: 2
  },
  categoryLogoContainer: {
    height: 64,
    width: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  text: {
    // textAlign: 'center',
    fontFamily: FONTS.LatoRegular,
    fontWeight: '500',
    paddingVertical: 5
  },
  selectedLogo: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 0
  }
})