import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

import {asserts} from '../constants';
import {signOut} from '../utils/aws.helper';

const Logout = () => {
  const pressHandler = async () => {
    await signOut();
  };
  return (
    <TouchableOpacity style={styles.container} onPress={pressHandler}>
      <Image source={asserts.logout} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 15,
    top: 10,
    opacity: 0.4,
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
});
