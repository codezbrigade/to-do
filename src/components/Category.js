import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {FONTS, categoryLogoMap, asserts, strings} from '../constants';

import CreatNewCategory from './CreatNewCategory';

const Category = ({category, handlePress, value}) => {
  const selectCategory = () => {
    if (category.name === strings.customize) {
      handlePress({name: '', color: 'rgba(0,0,0,0)'});
    } else if (category.name === value) {
      handlePress({name: '', color: 'rgba(0,0,0,0)'});
    } else {
      handlePress(category);
    }
  };

  if (category.name === strings.customize) return <CreatNewCategory />;

  return (
    <Pressable onPress={selectCategory}>
      <View
        style={{
          ...styles.categoryLogoContainer,
          backgroundColor: category.color,
          opacity: value === category.name ? 0.6 : 1,
        }}>
        <Image
          source={categoryLogoMap[category.name]}
          resizeMode="contain"
          style={[{width: 15, height: 15}]}
        />
        <Text style={styles.text}>{category.name}</Text>
      </View>
      {value === category.name ? (
        <Image
          source={asserts.selected}
          style={styles.selectedLogo}
          resizeMode="contain"
        />
      ) : null}
    </Pressable>
  );
};

export default Category;

const styles = StyleSheet.create({
  categoryLogoContainer: {
    marginRight: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    marginVertical: 8,
    flexWrap: 'wrap',
    paddingVertical: 5,
  },
  text: {
    paddingLeft: 15,
    fontFamily: FONTS.LatoRegular,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18.06,
  },
  selectedLogo: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: '12%',
    top: '2%',
  },
});
