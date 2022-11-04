import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,  //200px
    // zIndex: 1,
    marginBottom: 5,
  },
  hiddenItem: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    flex: 1
  },
  leftHiddenItem: {
    backgroundColor: 'grey',
    flex: 1,
    height: '80%',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    justifyContent: 'center'
  },
  rightHiddenItem: {
    backgroundColor: '#fda',
    flex: 1,
    height: '80%',
    justifyContent: 'center',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'flex-end'
  },
  editIcon: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
    marginLeft: 20
  },
  deleteIcon: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
    marginRight: 20
  },

  backgroundContainer: {
    opacity: 0.3,
    flex: 1,
    backgroundColor: '#000',
    zIndex: 0,
  }
})