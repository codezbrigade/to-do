import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Image, Pressable, StyleSheet, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { BackgroundView, Form, Heading } from '../components';
import { asserts } from '../constants';

const NewTask = ({ route }) => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView behavior='height' style={styles.screen}>
        <BackgroundView>
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Heading />

              <Pressable
                style={({ pressed }) => [{ marginRight: '4%', padding: 10, opacity: pressed ? 0.7 : 1 }]}
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
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default NewTask;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // borderWidth: 1
  },
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

});