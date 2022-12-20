import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import Task from './Task';

const Section = ({toDoData, setToDoList}) => {
  const renderVisibleItem = (data, rowMap) => {
    return (
      <View style={styles.rowFront}>
        <Task item={data.item} setToDoList={setToDoList} />
      </View>
    );
  };

  return (
    <View style={styles.flatListContainer}>
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
    borderRadius: 16,
  },
});
