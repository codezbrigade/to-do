import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import {
  asserts,
  COLORS,
  FONTS,
  TODOLIST,
  strings,
  todoKey,
  HEADERS,
  MONTHS,
  ROUTES
} from '../constants';

import { CircularButton } from '../components';
import { Section } from '../components';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { getAllKeys, removeData } from '../utils/asyncStorage';

const Home = ({ route }) => {

  let temp = null;
  if (route.params) temp = route.params;

  const { getItem, setItem } = useAsyncStorage(todoKey);

  const [toDoList, setToDoList] = useState([]);
  const [toDos, setToDos] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      // let jsonValue = JSON.stringify(TODOLIST);  //* upload sample data to ASYNC storage
      // await setItem(jsonValue);
      // console.log('done')

      // let keys = await getAllKeys(); 
      // console.log(keys)

      // await removeData(todoKey);

      let data = await getItem() || '[]';
      // console.log(typeof (data));
      setToDoList(JSON.parse(data))
    })()
  }, [])

  useEffect(() => {
    if (temp) {
      setToDoList([...temp])
    }
  }, [route])

  useEffect(() => {
    if (!toDoList) return;
    let now = new Date();

    const completedToDos = [];
    const todayToDos = [];
    const others = [];
    // const missed = [];

    toDoList.forEach(element => {
      const { isCompleted, time } = element;
      let timeArr = time.split(' ');

      if (!isCompleted) {
        if (timeArr[2] > now.getFullYear()) {
          others.push(element);
        } else if (MONTHS.indexOf(timeArr[0]) > now.getMonth()) {
          others.push(element);
        } else if (timeArr[1] > now.getDate()) {
          others.push(element);
        } else if (timeArr[1] == now.getDate()) {
          todayToDos.push(element);
        } else {
          others.push(element);
        }
      } else completedToDos.push(element)
    });

    let mapped = [todayToDos, others, completedToDos];
    // setToDos(mapped)

    let finalOutput = HEADERS.map((obj, idx) => ({ ...obj, toDoData: mapped[idx] }))
    // console.log(finalOutput);
    setToDos(finalOutput)
  }, [toDoList])

  return (
    <View style={styles.container}>

      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.statusBar}
        animated={true}
      />

      {/*<View style={styles.top}>
        <Image
          source={asserts.home_top}
          style={{ width: '100%', height: '100%' }}
          resizeMode={'cover'}
        />
  </View>*/}

      <View style={{
        justifyContent: 'flex-start',
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 50
      }}>

        <Text style={styles.heading}>{strings.your_task}</Text>

        {
          toDos.map((toDo, i) =>
            <Section toDoList={toDoList} key={i}
              section={toDo}
              setToDoList={setToDoList}
            />
          )
        }

      </View>

      <View style={styles.bottom}>
        <Image
          source={asserts.home_bottom}
          resizeMode={'contain'}
          style={{ height: '100%', width: '100%' }}
        />
        <CircularButton
          position={'absolute'}
          bottom={45}
          zIndex={1}
          width={70}
          height={70}
          borderWidth={0}
          imageUrl={asserts.addTask}
          handlePress={() => navigation.navigate(ROUTES.new_task_screen)}
        />
      </View>

    </View >
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
  },

  top: {
    height: 160,
    // flex: 1,
    width: '100%'
  },


  bottom: {
    height: 83,
    // flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  heading: {
    fontFamily: FONTS.LatoRegular,
    fontWeight: '500',
    fontSize: 24,
    height: 29,
    marginVertical: 8,
  },
  flatListContainer: {
    height: '50%',  //200px
    // zIndex: 1,
    marginBottom: 5
  },

})