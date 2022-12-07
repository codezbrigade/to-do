import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
// import { SwipeListView } from 'react-native-swipe-list-view';

// import SectionHeader from './SectionHeader';
import Task from './Task';

// import HiddenItem from './HiddenItem';

const Section = ({ toDoData, setToDoList }) => {
  const [timeUp, setTimeUp] = useState(false);

  // const { title, imageUrl, toDoData } = section;

  const renderVisibleItem = (data, rowMap) => {
    return (
      <View style={styles.rowFront}>
        <Task item={data.item} setToDoList={setToDoList} setTimeUp={setTimeUp} />
      </View>
    );
  };

  // const renderHiddenItem = (data, rowMap) => {
  //   return <HiddenItem
  //     data={data}
  //     rowMap={rowMap}
  //     state={{ timeUp, setTimeUp }}
  //     setToDoList={setToDoList}
  //   />;
  // };

  return (
    <View style={styles.flatListContainer}>
      {/* <SwipeListView
        data={toDoData}
        renderItem={renderVisibleItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75} //75
        rightOpenValue={-75} //-75
        stopLeftSwipe={150}
        stopRightSwipe={-150}
        leftActivationValue={150}
        rightActivationValue={-150}
        leftActionValue={0}
        rightActionValue={-500}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
  /> */}
      <FlatList
        data={toDoData}
        renderItem={renderVisibleItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    marginBottom: 5,
    overflow: 'hidden',
    borderRadius: 16
  }
});