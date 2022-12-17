// import { useNavigation } from '@react-navigation/native';
import React, {useRef} from 'react';
import {
  Animated,
  Image,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// import {
//   heightPercentageToDP as hp
// } from 'react-native-responsive-screen';

import {asserts, COLORS, FONTS} from '../constants';
// import { CircularButton } from './Buttons';

// const HEIGHT = Dimensions.get('screen').height;
// const WIDTH = Dimensions.get('screen').width;

const SearchBar = ({searchInput, setSearchInput}) => {
  const progress = useRef(new Animated.Value(0)).current;
  const search = useRef(new Animated.Value(1)).current;

  const handleChange = text => {
    if (text.length === 1)
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSearchInput(text);
  };

  const handlePress = () => {
    Animated.parallel([
      Animated.timing(progress, {toValue: 1, useNativeDriver: false}),
      Animated.timing(search, {toValue: 0, useNativeDriver: false}),
    ]).start();
  };

  const hide = item => {
    setSearchInput('');
    Animated.parallel([
      Animated.timing(progress, {toValue: 0, useNativeDriver: false}),
      Animated.timing(search, {toValue: 1, useNativeDriver: false}),
    ]).start();
  };

  // const textInputAnime = () => ({
  //   paddingHorizontal: progress.interpolate({
  //     inputRange: [0, 1],
  //     outputRange: [0, 54]
  //   })
  // })

  return (
    <View style={[styles.inputContainer]}>
      <Animated.View
        style={{...styles.btnContainer, zIndex: search, opacity: search}}>
        <Pressable onPress={handlePress} style={styles.mainBtn}>
          <Image source={asserts.searchLogo} style={styles.image} />
        </Pressable>
      </Animated.View>
      <Animated.View
        style={[
          styles.searchContainer,
          {
            opacity: progress,
            zIndex: progress,
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}>
        <View style={styles.textInputContainer}>
          <TextInput
            onChangeText={handleChange}
            style={[styles.input]}
            placeholder="search"
            defaultValue={searchInput}
          />
        </View>
        <Image source={asserts.search} style={styles.search} />
        <TouchableOpacity style={styles.closeBtn} onPress={hide}>
          <Image source={asserts.searchCloseLogo} style={styles.searchClose} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  mainBtn: {
    height: '100%',
    width: '100%',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.main,
  },
  inputContainer: {
    marginVertical: 26,
    width: '100%',
  },
  image: {
    height: 17,
    width: 17,
  },
  btnContainer: {
    left: '1%',
    height: 42,
    width: 42,
    borderRadius: 40,
  },
  searchContainer: {
    height: 42,
    position: 'absolute',
  },
  search: {
    height: 17,
    width: 17, //animation property 0 ---> 17
    position: 'absolute',
    top: '30%',
    left: '5%',
  },
  closeBtn: {
    position: 'absolute',
    right: '5%',
    top: '30%',
  },
  searchClose: {
    height: 17,
    width: 17, //animation property 0 ---> 17
  },
  textInputContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 54, //animation property 0 ---> 54
    height: '100%',
    width: '100%', //animation property 0 ---> 100%
    borderRadius: 42,
    fontFamily: FONTS.RobotoRegular_400,
    fontSize: 18,
    lineHeight: 21.09,
  },
});
