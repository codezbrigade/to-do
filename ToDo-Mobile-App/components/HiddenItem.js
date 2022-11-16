import { useEffect } from "react";

import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { asserts, ROUTES, todoKey } from "../constants";

import * as Notifications from 'expo-notifications';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const HiddenItem = ({ data, rowMap, state: { timeUp, setTimeUp }, setToDoList }) => {
  const navigation = useNavigation();
  const { getItem, setItem } = useAsyncStorage(todoKey);

  useEffect(() => {
    setTimeout(() => {
      // console.log("time out func", timeUp)
      setTimeUp(true)
    }, 2000)
  }, [])

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteItem = async (rowMap, item) => {      //delete todo
    closeRow(rowMap, item.id);

    let data = await getItem();
    let jsonValue = JSON.parse(data);

    let filteredList = jsonValue.filter(obj => obj.id !== item.id);

    // console.log(item.id, "Notification deleted")
    await Notifications.cancelScheduledNotificationAsync(item.id);

    await setItem(JSON.stringify(filteredList));

    setToDoList([...filteredList]);
  }


  const editItem = (rowMap, item) => {
    navigation.navigate(ROUTES.new_task_screen, { item })
    closeRow(rowMap, item.id);
  }

  return timeUp && (
    <View style={{
      ...styles.rowBack,
      ...styles.hiddenItem
    }}>
      <TouchableOpacity style={styles.leftHiddenItem} onPress={() => editItem(rowMap, data.item)}>
        <Image source={asserts.edit} style={styles.editIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightHiddenItem} onPress={() => deleteItem(rowMap, data.item)}>
        <Image source={asserts.deleteIcon} style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  )
}

export default HiddenItem;

const styles = StyleSheet.create({
  hiddenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: "absolute",
    top: hp(0.797),
    width: '100%',
    height: hp(9.97),
    opacity: 0.8
  },
  leftHiddenItem: {
    backgroundColor: 'grey',
    flex: 1,
    height: '80%',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    justifyContent: 'center'
  },
  rightHiddenItem: {
    backgroundColor: '#fda',
    flex: 1,
    height: '80%',
    justifyContent: 'center',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'flex-end'
  },
  editIcon: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
    marginLeft: wp(4.72)
  },
  deleteIcon: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
    marginRight: wp(4.72)
  },
})