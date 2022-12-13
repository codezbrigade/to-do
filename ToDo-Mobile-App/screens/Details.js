import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { BackgroundView, Heading, Preview } from '../components'

const Details = ({ route }) => {
  return (
    <BackgroundView>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Heading />
        </View>
        <Preview route={route} />
      </View>
    </BackgroundView>
  )
}

export default Details

const styles = StyleSheet.create({
  headingContainer: {
    alignSelf: 'center',
    width: '90%',
  },
  container: {
    flex: 1,
  }

})