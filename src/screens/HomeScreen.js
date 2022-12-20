import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useGlobalStore} from 'react-native-global-store';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {asserts, COLORS, ROUTES, strings, todoKey} from '../constants';

import BackgroundView from '../components/BackgroundView';
import Heading from '../components/Heading';
import Fact from '../components/Fact';
import Headers from '../components/Headers';
import SearchBar from '../components/SearchBar';
import AddYourTask from '../components/AddYourTask';
import Section from '../components/Section';
import {CircularButton} from '../components/Buttons';
import HomeModal from '../components/HomeModal';
import AppRating from '../components/AppRating';
import {filterFunction} from '../utils/filter';

const HomeScreen = ({route}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState({
    title: strings.today,
    id: 0,
  });
  const [toDoList, setToDoList] = useState([]);
  const [toDos, setToDos] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isRatingVisible, setISRatingVisible] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [globalState, setGlobalState] = useGlobalStore();
  const {getItem} = useAsyncStorage(todoKey);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let data = (await getItem()) || '[]';
      if (!JSON.parse(data).length) {
        // setIsModalVisible(true);
      }
      setToDoList(JSON.parse(data));
    })();
  }, []);

  useEffect(() => {
    if (toDoList.length === 1 && globalState.isFirstTime) {
      showRatingModal(4000);
    }
    let temp = filterFunction(toDoList);
    setToDos([...temp]);
  }, [toDoList]);

  useEffect(() => {
    let temp = null;
    if (route.params) {
      temp = route.params;
      setToDoList([...temp?.data]);
    }
    // console.log(route);
  }, [route]);

  useEffect(() => {
    let data = [];
    let lowerCase = searchInput.toLocaleLowerCase();
    if (lowerCase) {
      data = toDoList.filter(
        obj =>
          obj.title.toLocaleLowerCase().includes(lowerCase) ||
          obj.subTitle.toLocaleLowerCase().includes(lowerCase),
      );
    } else {
      data = toDos[selectedHeader.id];
    }
    setFilteredData(data);
  }, [searchInput, selectedHeader, toDos]);

  const navigationHandler = () => {
    navigation.navigate(ROUTES.new_task_screen);
  };

  const showRatingModal = time => {
    setTimeout(() => {
      setISRatingVisible(true);
    }, time);
  };

  return (
    <>
      <BackgroundView>
        <View style={styles.homeContainer}>
          <View style={styles.subHomeContainer}>
            <Heading />
            <Fact facts={globalState.facts} />
            <Headers
              selectedHeader={selectedHeader}
              setSelectedHeader={setSelectedHeader}
            />
            <SearchBar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
            <View style={[styles.todos]}>
              {!searchInput && toDos[selectedHeader.id] ? (
                selectedHeader.title !== strings.completed &&
                !toDos[selectedHeader.id].length ? (
                  <AddYourTask
                    selectedHeader={selectedHeader.title}
                    handlePress={navigationHandler}
                  />
                ) : (
                  !toDos[selectedHeader.id].length && (
                    <AddYourTask selectedHeader={selectedHeader.title} />
                  )
                )
              ) : null}
              {toDos[selectedHeader.id] && (
                <Section toDoData={filteredData} setToDoList={setToDoList} />
              )}
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
      <HomeModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <AppRating
        isRatingVisible={isRatingVisible}
        setISRatingVisible={setISRatingVisible}
        showRatingModal={showRatingModal}
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
