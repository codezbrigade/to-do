import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  AddYourTask,
  BackgroundView,
  CircularButton,
  ClearAll,
  Fact,
  Greetings,
  Headers,
  Heading,
  HomeModal
} from '../components';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { asserts, COLORS, HEADERS, strings, ROUTES } from '../constants';

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);  //change it to true
  const [selectedHeader, setSelectedHeader] = useState('Today');

  const navigation = useNavigation();

  const navigationHandler = () => navigation.navigate(ROUTES.new_task_screen);

  return (
    <BackgroundView>
      <View style={styles.homeContainer}>
        <View style={styles.subHomeContainer}>
          <Heading />
          <Greetings />
          <Headers selectedHeader={selectedHeader} setSelectedHeader={setSelectedHeader} />
          <Fact />
          <View style={styles.todos}>

            {selectedHeader === strings.completed && <ClearAll />}
            { // if completed is empty then only you have to show empty msg.                  --- not implimented 
              selectedHeader === strings.today ?
                <AddYourTask selectedHeader={selectedHeader} handlePress={navigationHandler} />
                : selectedHeader === strings.completed ? <AddYourTask selectedHeader={selectedHeader} /> : null
            }

          </View>
        </View>

      </View>
      <View style={styles.buttonContainer}>
        <CircularButton
          position={'absolute'}
          top={0}
          right={0}
          backgroundColor={COLORS.main}
          width={70}
          height={70}
          borderWidth={0}
          imageUrl={asserts.addTask}
          handlePress={navigationHandler}
        />
      </View>
      <Modal visible={isModalVisible} transparent={true}>
        <HomeModal setIsModalVisible={setIsModalVisible} />
      </Modal>
    </BackgroundView>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  subHomeContainer: {
    height: '99%',
    width: '90%',
    // borderWidth: 1,
  },
  buttonContainer: {
    height: hp(15),
    width: '90%',
    alignSelf: 'center'
  },


  todos: {
    marginTop: 22,
    flex: 1,
    paddingVertical: hp(2)
  },
});