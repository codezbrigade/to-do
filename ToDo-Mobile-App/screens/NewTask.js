import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Image, Pressable, StyleSheet, View } from 'react-native';
import { BackgroundView, CircularButton, Form, Heading } from '../components';
import { asserts, COLORS } from '../constants';

const NewTask = ({ route }) => {
  const navigation = useNavigation();

  return (
    <BackgroundView>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Heading />

          <Pressable
            style={({ pressed }) => [{ marginRight: "4%", padding: 10, opacity: pressed ? 0.7 : 1 }]}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={asserts.goback}
              style={{ width: 16 }}
              resizeMode='contain'
            />
          </Pressable>

        </View>
        <Form route={route} navigation={navigation} />
      </View>

    </BackgroundView>

  );
};

export default NewTask;

const styles = StyleSheet.create({
  headingContainer: {
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // overflow: 'visible',
    // borderWidth: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#FBFAFB',
    opacity: 0.85,
    // justifyContent: 'space-between'
    // borderWidth: 1

  }

})