import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../constants";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { RFValue } from 'react-native-responsive-fontsize';


export const styles = StyleSheet.create({

  form: {
    flex: 1,
    paddingLeft: 48,
    paddingRight: 31,
  },
  createNewTask: {
    width: '100%',
    marginVertical: 13,
    fontFamily: FONTS.LatoRegular,
    fontWeight: '500',
    fontSize: RFValue(16),
    color: COLORS.black,
  },
  titleInputContainer: {
    height: 54,
    width: '100%',
  },
  title: {
    // top: '47%',
    color: 'red',
    fontFamily: FONTS.LatoRegular,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19.2,
  },
  titleInput: {
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    fontFamily: FONTS.LatoRegular,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19.2,
    color: '#484848'
  },
  textInputContainer: {
    // paddingHorizontal: wp(9),
    marginVertical: hp(4),
    width: '100%',
    justifyContent: 'flex-start',
  },
  categoryTitle: {
    marginVertical: 23,
    fontSize: RFValue(14),
    lineHeight: hp(3.05),
    fontFamily: FONTS.LatoRegular,
    fontWeight: '700',
    color: 'rgba(0,0,0,87)',
    width: '100%'
  },
  categoryListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "flex-start",
    alignItems: 'center',
  },
  taskDetails: {
    marginTop: 23,
    marginBottom: 13,
    width: '100%',
    fontFamily: FONTS.LatoRegular,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24.08,
  },
  dateTimeContainer: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clockLogo: {
    // borderWidth: 1,
    width: 23,
  },
  dateTime: {
    fontSize: RFValue(14),
    lineHeight: hp(2.42),
    fontWeight: '400',
    fontFamily: FONTS.LatoRegular,
    // width: '80%',
    color: 'rgba(0,0,0,0.5)'
  },
  descriptionInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionInputSubContainer: {
    height: 50,
    width: '85%',
    justifyContent: 'space-between'

  },
  description: {
    fontSize: RFValue(14),
    lineHeight: hp(2.42),
    fontWeight: '400',
    fontFamily: FONTS.LatoRegular,
    color: '#303030',
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderBottomWidth: 1
  },
})
