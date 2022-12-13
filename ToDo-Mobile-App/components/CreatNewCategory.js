import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { asserts, COLORS } from '../constants'

const CreatNewCategory = ({ pressHandle }) => {
  return (
    <TouchableOpacity onPress={pressHandle}>
      <View style={styles.container}>
        <Image
          source={asserts.customize}
          style={{ width: 12 }}
          resizeMode='contain'
        />
      </View>
    </TouchableOpacity>
  )
}

export default CreatNewCategory

const styles = StyleSheet.create({
  container: {
    width: 27,
    height: 27,
    borderRadius: 30,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.grey_c
  }
})