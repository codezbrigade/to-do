import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Modal, TouchableWithoutFeedback, Keyboard, LayoutAnimation } from 'react-native';
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
  HomeModal,
  Preview,
  SearchBar,
  Section
} from '../components';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { asserts, COLORS, HEADERS, strings, ROUTES, todoKey, TODOLIST, MONTHS } from '../constants';

import { getAllKeys, removeData } from '../utils/asyncStorage';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const Home = ({ route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedHeader, setSelectedHeader] = useState({
    title: strings.today,
    id: 0
  });
  const [toDoList, setToDoList] = useState([]);
  const [toDos, setToDos] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const { getItem, setItem } = useAsyncStorage(todoKey);

  useEffect(() => {
    let data = [];

    if (searchInput) {
      data = toDoList.filter(obj =>
        obj.title.toLocaleLowerCase().includes(searchInput)
        || obj.subTitle.toLocaleLowerCase().includes(searchInput)
      )
    } else data = toDos[selectedHeader.id];

    setFilteredData(data);
  }, [searchInput, selectedHeader, toDos])

  useEffect(() => {
    (async () => {
      let data = await getItem() || '[]';
      if (!JSON.parse(data).length) {
        setIsModalVisible(true);
      }
      setToDoList(JSON.parse(data));
    })()
  }, [])

  useEffect(() => {
    let today = [];
    let completed = [];
    let tomorrow = [];
    let upcoming = [];
    let others = [];
    let now = new Date();

    toDoList.forEach(element => {
      const { isCompleted, time } = element;
      let timeArr = time.split(' ');

      if (!isCompleted) {
        if (timeArr[2] > now.getFullYear()) {
          upcoming.push(element);
        } else if (MONTHS.indexOf(timeArr[0]) > now.getMonth()) {
          upcoming.push(element);
        } else if (timeArr[1] > now.getDate() + 1) {
          upcoming.push(element);
        } else if (timeArr[1] > now.getDate()) {
          tomorrow.push(element);
        } else if (timeArr[1] == now.getDate()) {
          today.push(element);
        } else {
          others.push(element);
        }
      } else completed.push(element)
    });

    let temp = [today, tomorrow, upcoming, completed];

    setToDos([...temp]);

  }, [toDoList])

  let temp = null;
  if (route.params) temp = route.params;
  useEffect(() => {
    if (temp) {
      setToDoList([...temp])
    }
  }, [route])

  const navigation = useNavigation();

  const navigationHandler = async () => {
    navigation.navigate(ROUTES.new_task_screen);
  }

  return (
    <>
      <BackgroundView>
        <View style={styles.homeContainer}>
          <View style={styles.subHomeContainer}>
            <Heading />

            <Fact />

            <Headers selectedHeader={selectedHeader} setSelectedHeader={setSelectedHeader} />

            <SearchBar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />

            <View style={[styles.todos]}>

              {!searchInput &&
                toDos[selectedHeader.id] ?
                (
                  selectedHeader.title === strings.today && !toDos[selectedHeader.id].length ?
                    <AddYourTask selectedHeader={selectedHeader.title} handlePress={navigationHandler} />
                    : selectedHeader.title === strings.completed && !toDos[selectedHeader.id].length ?
                      <AddYourTask selectedHeader={selectedHeader.title} />
                      : null
                )
                : null
              }

              {
                toDos[selectedHeader.id] &&
                <Section toDoData={filteredData} setToDoList={setToDoList} />
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

      </BackgroundView>
      <Modal visible={isModalVisible} transparent={true}>
        <HomeModal setIsModalVisible={setIsModalVisible} />
      </Modal>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  subHomeContainer: {
    height: '99%',
    width: '90%',

  },
  buttonContainer: {
    height: hp(24),
    width: '90%',
    alignSelf: 'center',

  },
  todos: {
    flex: 1,
    // paddingVertical: hp(2),
  },
});