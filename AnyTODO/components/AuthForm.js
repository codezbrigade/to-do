import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

import { COLORS, FONTS } from '../constants';
import { RectButton } from './Buttons';

import { useGlobalStore } from 'react-native-global-store';

const AuthForm = ({ googleLogin, facebookLogin, logout }) => {
  const [globalState, setGlobalState] = useGlobalStore();

  const [fields, setFields] = useState({
    email: '',
    password: ''
  });

  const changeHandle = (name, value) => {
    setFields({
      ...fields,
      [name]: value
    });
  };

  return (
    <View style={styles.authForm}>
      <Text style={styles.formTitle}>Login / Signup</Text>
      <View style={styles.fieldContainer}>
        <TextInput
          placeholder='Email'
          style={styles.userName}
          onChangeText={(value) => changeHandle('email', value)} />
        <TextInput
          placeholder='password'
          style={styles.userName}
          onChangeText={(value) => changeHandle('password', value)} />
        <View style={styles.btnGrp}>
          {
            !globalState.authenticatedToken ?
              <RectButton style={styles.login} title={'Login'} handlePress={() => { }} /> :
              <RectButton style={[styles.login, { backgroundColor: COLORS.delete }]} color='white' title={'Logout'} handlePress={logout} />
          }
          {!globalState.authenticatedToken && <RectButton style={styles.signUp} title={'Signup'} handlePress={() => { }} />}
        </View>
        <RectButton color='white' style={styles.google} title={'Google'} handlePress={googleLogin} />
        <RectButton color='white' style={styles.facebook} title={'Facebook'} handlePress={facebookLogin} />
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  google: {
    marginTop: '5%',
    backgroundColor: 'tomato',
    paddingVertical: 10,
  },
  facebook: {
    marginVertical: '5%',
    backgroundColor: 'blue',
    paddingVertical: 10,
  },
  btnGrp: {
    marginTop: '2%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-around'
  },
  signUp: {
    paddingVertical: 10,
    paddingHorizontal: '15%',
    backgroundColor: COLORS.customize
  },
  login: {
    paddingVertical: 10,
    paddingHorizontal: '15%',
    backgroundColor: COLORS.grey_c
  },
  fieldContainer: {
    justifyContent: 'center',
    marginHorizontal: 15,

  },
  userName: {
    textAlign: 'center',
    fontFamily: FONTS.RobotoMedium_500,
    fontSize: 25,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: COLORS.main,
    marginBottom: '5%',
  },

  formTitle: {
    textAlign: 'center',
    fontFamily: FONTS.RobotoMedium_500,
    fontSize: 32,
    paddingBottom: 10,
    color: COLORS.main,
    opacity: 0.6,
  },
  authForm: {
    elevation: 5,
    width: '80%',
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    opacity: 0.8,
    borderRadius: 16
  },
});