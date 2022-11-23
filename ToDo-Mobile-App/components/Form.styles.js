import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../constants";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { RFValue } from 'react-native-responsive-fontsize';


export const styles = StyleSheet.create({

  form: {
    // height: '80%',
    width: '100%',
    marginTop: hp(1.5), //12
    borderRadius: 16,
    backgroundColor: 'rgba(253, 252, 252, 0.95)',
    paddingVertical: hp(2),//16,
    alignItems: 'center',
    elevation: 5,
    // position: "absolute",
    // top: hp(13), //100
  },
  title: {
    width: '100%',
    paddingHorizontal: wp(8.9),
    fontFamily: FONTS.LatoRegular,
    fontWeight: '500',
    fontSize: RFValue(16),
    color: COLORS.greetings,
  },
  textInputContainer: {
    paddingHorizontal: wp(9),
    marginVertical: hp(4),
    width: '100%',
    justifyContent: 'flex-start',
  },
  addTitle: {
    height: hp(7.4),
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'rgba(0,0,0,0.1)',
    fontFamily: FONTS.LatoRegular,
    fontWeight: '400',
    fontSize: RFValue(29),
    lineHeight: 38.4,
    color: 'rgba(0,0,0,0.7)',
    backgroundColor: COLORS.white

  },
  textInput: {
    height: '42%',
    fontSize: RFValue(29),
    fontFamily: FONTS.InterRegular,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)'
  },
  dateInput: {
    height: hp(7.4),
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomColor: 'rgba(0,0,0,0.2)'
  },
  date: {
    fontSize: RFValue(14),
    lineHeight: hp(2.42),
    fontWeight: '400',
    fontFamily: FONTS.LatoRegular,
    width: '80%',
    // color: 'rgba(0,0,0,0.5)'
  },
  descriptionContainer: {
    justifyContent: "flex-end",
    height: hp(9.9),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)'
  },
  subTitleInput: {
    fontSize: RFValue(14),
    fontWeight: '400',
    lineHeight: hp(2.45),
    fontFamily: FONTS.LatoRegular,
  },
  categoryContainer: {
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: wp(10),
  },
  categoryTitle: {
    fontSize: RFValue(14),
    lineHeight: hp(3.05),
    fontFamily: FONTS.LatoRegular,
    fontWeight: '700',
    paddingBottom: hp(3),
    color: 'rgba(0,0,0,0.87)'
  },
  categoryList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexWrap: 'wrap',
  }
})
