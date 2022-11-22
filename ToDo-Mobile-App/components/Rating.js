import { Dimensions, Image, Modal, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { asserts, COLORS, FONTS, strings } from '../constants'

import { AirbnbRating, Rating } from 'react-native-ratings';
import { RectButton } from './Buttons';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { ratingKey } from '../constants/AsyncStorageKey';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

const AppRating = ({ isRatingVisible, setISRatingVisible }) => {
  const [rating, setRating] = useState(0);
  const { setItem, getItem } = useAsyncStorage(ratingKey);

  // useEffect(() => {
  //   console.log(rating, "hi");
  // }, [rating])

  const handlePress = async () => {
    await setItem(JSON.stringify(rating));
    setISRatingVisible(false);
    // let key = await getItem();
    // key = JSON.parse(key);
    // console.log(key, "key from storage")
  }

  return (
    <Modal animationType='fade' visible={isRatingVisible} transparent>
      <StatusBar animated={true} barStyle={'dark-content'} backgroundColor={COLORS.modalBackground} />
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <Image source={asserts.rateHeadLogo} style={styles.image} />
          <Text style={styles.title}>{strings.ratingTitle}</Text>
          <Text style={styles.subTitle}>{strings.ratingSubTitle}</Text>
          <View style={styles.rating}>
            {/*<Rating
              jumpValue={1}
              onFinishRating={setRating}
              startingValue={rating}
              imageSize={22}
  />*/}
            {[...Array(5)].map((_, idx) => {
              let ratingValue = idx + 1;
              return (
                <Pressable key={idx} onPress={() => setRating(ratingValue)}>
                  <Image source={ratingValue <= rating ? asserts.ratedStar : asserts.unratedStar} style={styles.img} />
                </Pressable>
              )
            })}
          </View>

          <View style={styles.btnGroup}>
            <RectButton
              color={COLORS.white}
              borderWidth={1}
              title={strings.rate}
              backgroundColor={COLORS.main}
              paddingHorizontal={24}
              handlePress={handlePress}
            />
            <RectButton
              title={strings.not_now}
              borderWidth={1}
              borderColor={COLORS.main}
              paddingHorizontal={24}
              handlePress={() => setISRatingVisible(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default AppRating

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: COLORS.modalBackground,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ratingContainer: {
    minHeight: '32%',
    width: '82%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: 'center'
  },
  image: {
    height: 124,
    width: 124,
    resizeMode: 'contain',
    position: 'absolute',
    top: '-29%',
    // top: -57
  },
  img: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
    marginHorizontal: '1%'
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.RobotoMedium_500,
    fontSize: 18,
    lineHeight: 21.09,
    marginTop: 52,
    marginBottom: 9,
    // marginVertical: 9,
    // borderWidth: 1
  },
  subTitle: {
    fontSize: 24,
    fontFamily: FONTS.RobotoRegular_400,
    fontSize: 12,
    lineHeight: 14,
    color: '#484848'
  },
  rating: {
    marginTop: 16,
    marginBottom: 45,
    flexDirection: 'row'
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
  },
})