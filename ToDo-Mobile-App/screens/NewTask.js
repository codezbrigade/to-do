import React from 'react';

import { StyleSheet,  View } from 'react-native';
import { BackgroundView, Form, Heading } from '../components';

const NewTask = ({ route }) => {

  return (
    <BackgroundView>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Heading />
        </View>

        <Form route={route} />
      </View>

    </BackgroundView>

  );
};

export default NewTask;

const styles = StyleSheet.create({
  headingContainer: {
    alignSelf: 'center',
    width: '90%',
  },
  container: {
    flex: 1,
  }

})