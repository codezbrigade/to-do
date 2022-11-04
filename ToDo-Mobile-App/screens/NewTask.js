import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { CircularButton, Form } from '../components';

import { asserts, COLORS, FONTS } from '../constants';

// import { getAllKeys } from '../utils/asyncStorage';

const NewTask = ({ route }) => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.statusBar}
        animated={true}
      />

      <View style={styles.top}>
        <Image
          source={asserts.new_task_top}
          resizeMode={'cover'}
          style={{ height: '100%', width: '100%' }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            left: 40
          }}
        >
          <Text style={{
            fontFamily: FONTS.InterRegular,
            color: '#fff',
            fontSize: 24
          }}>New Task</Text>
        </View>

        <CircularButton
          borderWidth={0}
          imageUrl={asserts.close}
          position={'absolute'}
          height={20}
          width={20}
          top={35}
          left={25}
          handlePress={() => navigation.goBack()}
        />

      </View>

      <Form route={route} />

    </View>
  );
};

export default NewTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  top: {
    height: 160,
    width: '100%',
  },
  text: {
    fontSize: 30,
    fontWeight: '600'
  },

})