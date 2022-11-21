import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../constants'
import { RectButton } from './Buttons'

const Confirmation = ({ confirmDeleteItem, isvisible, setIsVisible }) => {
  return (
    <Modal visible={isvisible} animationType={'fade'} transparent>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.text1}>Are your sure?</Text>
          <Text style={styles.text2}>You want to delete your task</Text>
          <View style={styles.btnGroup}>
            <RectButton
              // color={}
              borderWidth={1}
              title={"Cancel"}
              backgroundColor={'white'}
              handlePress={() => setIsVisible(false)}
            />
            <RectButton
              color={'#fff'}
              title={"Delete"}
              backgroundColor={COLORS.delete}
              handlePress={confirmDeleteItem}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default Confirmation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.sub_title,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subContainer: {
    width: '80%',
    height: '18%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 15
  },
  btnGroup: {
    flex: 1,
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    paddingTop: 10,
    alignSelf: 'center'
  },
  text1: {
    textAlign: 'center',
    fontFamily: FONTS.RobotoMedium_500,
    fontSize: 18,
    lineHeight: 21.09,
    color: COLORS.inActiveHeader
  },
  text2: {
    textAlign: 'center',
    paddingVertical: 8,
    fontFamily: FONTS.LatoRegular,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19.2,
    color: COLORS.grey_b
  },
})