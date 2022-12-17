import React from 'react';
// import {useNavigation} from '@react-navigation/native';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import BackgroundView from '../components/BackgroundView';
import Heading from '../components/Heading';
import Form from '../components/Form';

import {asserts} from '../constants';

const NewTaskScreen = ({route, navigation}) => {
  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView behavior="height" style={styles.screen}>
        <BackgroundView>
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Heading />
              <Pressable
                style={({pressed}) => [
                  {marginRight: '4%', padding: 10, opacity: pressed ? 0.7 : 1},
                ]}
                onPress={() => navigation.goBack()}>
                <Image
                  source={asserts.goback}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{width: 16}}
                  resizeMode="contain"
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

export default NewTaskScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headingContainer: {
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FBFAFB',
    opacity: 0.85,
  },
});
