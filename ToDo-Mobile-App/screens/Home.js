import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  View,
  StyleSheet,
} from 'react-native';

import {
  AddYourTask,
  BackgroundView,
  CircularButton,
  Fact,
  Headers,
  Heading,
  HomeModal,
  AppRating,
  SearchBar,
  Section
} from '../components';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { asserts, COLORS, strings, ROUTES, todoKey, MONTHS, ratingKey, countKey } from '../constants';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { useGlobalStore } from 'react-native-global-store';

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
  const [facts, setFacts] = useState([]);
  const [isRatingVisible, setISRatingVisible] = useState(false);
  const [globalState, setGlobalState] = useGlobalStore();

  const { getItem, setItem } = useAsyncStorage(todoKey);

  useEffect(() => {
    let data = [];
    let lowerCase = searchInput.toLocaleLowerCase();

    if (lowerCase) {
      data = toDoList.filter(obj =>
        obj.title.toLocaleLowerCase().includes(lowerCase)
        || obj.subTitle.toLocaleLowerCase().includes(lowerCase)
      )
    } else data = toDos[selectedHeader.id];

    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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

    if (toDoList.length === 1 && globalState["isFirstTime"]) showRatingModal(4000);

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

  useEffect(() => {
    let temp = null;
    if (route.params) temp = route.params;
    if (temp.data) {
      setToDoList([...temp.data])
    } else {
      let response = temp.facts;
      setFacts(response)
    }
  }, [route])

  const navigation = useNavigation();

  const navigationHandler = async () => {
    navigation.navigate(ROUTES.new_task_screen);
  }

  const showRatingModal = (time) => {
    setTimeout(() => { setISRatingVisible(true) }, time)
  }


  return (
    <>
      <BackgroundView>
        <View style={styles.homeContainer}>
          <View style={styles.subHomeContainer}>
            <Heading />

            <Fact facts={facts} />

            <Headers selectedHeader={selectedHeader} setSelectedHeader={setSelectedHeader} />

            <SearchBar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />

            <View style={[styles.todos]}>

              {!searchInput &&
                toDos[selectedHeader.id] ?
                (
                  selectedHeader.title !== strings.completed &&
                    !toDos[selectedHeader.id].length ?
                    <AddYourTask selectedHeader={selectedHeader.title} handlePress={navigationHandler} />
                    : !toDos[selectedHeader.id].length &&
                    <AddYourTask selectedHeader={selectedHeader.title} />
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
            top={'1%'}
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

      <HomeModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      <AppRating
        isRatingVisible={isRatingVisible}
        setISRatingVisible={setISRatingVisible}
        showRatingModal={showRatingModal}
      />
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
    height: hp(14),
    width: '90%',
    alignSelf: 'center',
  },
  todos: {
    flex: 1,
  },
});