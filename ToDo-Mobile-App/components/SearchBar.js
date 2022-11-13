import React, { useEffect } from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';

import {
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { asserts, COLORS } from '../constants';

const SearchBar = ({ searchInput, setSearchInput }) => {

  const handleChange = (text) => {
    setSearchInput(text.toLocaleLowerCase());
  }

  return (
    <View style={styles.container}>
      <TextInput onChangeText={handleChange} style={styles.input} placeholder='Search' defaultValue={searchInput} />

      {
        searchInput ? null :
          <Image source={asserts.search} style={[styles.image]} />
      }

    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: hp(6),
    width: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.searchBar,
    marginVertical: hp(2.8)
  },
  image: {
    height: hp(1.8),
    width: hp(1.8),
    resizeMode: 'contain',
    position: 'absolute',
    right: '38%',
    top: '33%'
  },
  input: {
    textAlign: 'center',
    height: '100%',
    width: '90%',
    borderRadius: 10,
  }
})