import { StyleSheet } from "react-native";
import { FONTS } from "../constants";

export const styles = StyleSheet.create({

  form: {
    height: '75%',
    width: '90%',
    marginTop: 12,
    borderRadius: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 23,
    alignItems: 'center',
    overflow: 'hidden'
  },
  textInputContainer: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-start',
    // borderWidth: 2
  },
  textInput: {
    height: '42%',
    fontSize: 32,
    fontFamily: FONTS.InterRegular,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)'
  },
  dateInput: {
    height: '29%',
    fontSize: 16,
    fontFamily: FONTS.InterRegular,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'rgba(0,0,0,0.2)'
  },
  subTitleInput: {
    height: '29%',
    fontSize: 16,
    fontFamily: FONTS.InterRegular,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)'
  },
  categoryContainer: {
    justifyContent: 'space-around',
    width: '100%'
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: FONTS.LatoRegular,
    fontWeight: '700',
    paddingVertical: 25
  },
  categoryList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    flexWrap: 'wrap',
    // width: '90%'
  }
})
