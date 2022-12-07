import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Switch, Text, View } from 'react-native';
import { asserts, FONTS, strings } from '../constants';

const DoNotRepeat = ({ handleToggle, switchBool }) => {

  const [isToggleEnabled, setIsToggleEnabled] = useState(switchBool);

  useEffect(() => {
    handleToggle(isToggleEnabled);
  }, [isToggleEnabled]);

  useEffect(() => {
    setIsToggleEnabled(switchBool);
  }, [switchBool]);

  const toggleSwitch = () => setIsToggleEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Image
        source={asserts.repeat}
        resizeMode='contain'
        style={styles.image}
      />
      <Text style={styles.text}>{strings.doNotRepeat}</Text>
      <Switch
        // trackColor={{ false: "#767577", true: "#81b0ff" }}
        // thumbColor={isToggleEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isToggleEnabled}
        style={styles.toggle}
      />
    </View>
  );
};

export default DoNotRepeat;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5
  },
  image: {
    height: 20,
    width: 20,
    marginLeft: 5,
    marginRight: 15
  },
  text: {
    fontSize: 16,
    fontFamily: FONTS.LatoRegular,
    fontWeight: '700'
  },
  toggle: {
    position: 'absolute',
    right: 50,
    borderColor: '#E9F8FF'
  }
});

