import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Image, Modal, LayoutAnimation } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { asserts, ROUTES, strings, todoKey } from '../constants';

import SectionHeader from './SectionHeader';
import Task from './Task';

import { styles } from './Section.styles';
import HiddenItem from './HiddenItem';

const Section = ({ section, setToDoList }) => {
  const [timeOut, settimeout] = useState(false);

  const { title, imageUrl, toDoData } = section;

  const renderVisibleItem = (data, rowMap) => {
    return (
      <View style={styles.rowFront}>
        <Task item={data.item} setToDoList={setToDoList} settimeout={settimeout} />
      </View>
    )
  };

  const renderHiddenItem = (data, rowMap) => {
    return <HiddenItem
      data={data}
      rowMap={rowMap}
      state={{ timeOut, settimeout }}
      setToDoList={setToDoList}
    />
  };

  return (
    <View style={styles.flatListContainer}>
      <SwipeListView
        data={toDoData}
        renderItem={renderVisibleItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-75}
        stopLeftSwipe={150}
        stopRightSwipe={-150}
        leftActivationValue={150}
        rightActivationValue={-150}
        // leftActionValue={0}
        // rightActionValue={-500}
        keyExtractor={item => item.id}
        ListHeaderComponent={<SectionHeader string={title} imageUrl={imageUrl} />}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Section;

