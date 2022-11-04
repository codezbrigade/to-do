import { useEffect } from "react";

import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { asserts, ROUTES, todoKey } from "../constants";

const HiddenItem = ({ data, rowMap, state: { timeOut, settimeout }, setToDoList }) => {
  const navigation = useNavigation();
  const { getItem, setItem } = useAsyncStorage(todoKey);

  useEffect(() => {
    setTimeout(() => {
      settimeout(true)
    }, 1000)
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

    await setItem(JSON.stringify(filteredList));
    setToDoList([...filteredList]);
  }


  const editItem = (rowMap, item) => {
    navigation.navigate(ROUTES.new_task_screen, { item })
    closeRow(rowMap, item.id);
  }

  return timeOut && (
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
    width: '100%',
    height: '100%',
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
    marginLeft: 20
  },
  deleteIcon: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
    marginRight: 20
  },
})