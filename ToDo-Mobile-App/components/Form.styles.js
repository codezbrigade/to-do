import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../constants";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { RFValue } from 'react-native-responsive-fontsize';


export const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  form: {
    // marginTop: 100,
    flex: 1,
    paddingLeft: "12%",
    paddingRight: "7%",
  },
  createNewTask: {
    width: '100%',
    // marginVertical: 13,
    marginVertical: "4%",
    fontFamily: FONTS.LatoRegular,
    fontWeight: '500',
    fontSize: RFValue(16),
    color: COLORS.black,
    // borderWidth: 2
  },
  titleInputContainer: {
    height: 54,
    width: '100%',
  },
  title: {
    fontFamily: FONTS.LatoRegular,
    fontWeight: '400',
    fontSize: RFValue(14),
    lineHeight: hp(2.42),
  },
  titleInput: {
    borderBottomWidth: 1,
    borderColor: COLORS.modalBackground,
    fontFamily: FONTS.LatoRegular,
    fontWeight: '400',
    fontSize: RFValue(14),
    lineHeight: hp(2.42),
    // color: COLORS.inActiveHeader
  },
  textInputContainer: {
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
    color: COLORS.black_1,
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
    fontSize: RFValue(14),
    lineHeight: 24.08,
  },
  dateTimeContainer: {
    // width: '70%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  clockLogo: {
    // borderWidth: 1,
    width: 23,
    marginRight: '10%'
  },
  dateTime: {
    fontSize: RFValue(14),
    lineHeight: hp(2.42),
    fontWeight: '400',
    fontFamily: FONTS.LatoRegular,
    // width: '80%',
    color: COLORS.sub_title
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
    // color: '#303030',
    borderColor: COLORS.modalBackground,
    borderBottomWidth: 1
  },
})