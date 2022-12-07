import { StyleSheet, View } from 'react-native';
import React from 'react';

import { AuthForm, BackgroundView, Heading } from '../components';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';

import { useGlobalStore } from 'react-native-global-store';

WebBrowser.maybeCompleteAuthSession();

const Auth = () => {

  const [globalState, setGlobalState] = useGlobalStore();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '867678872994-dt3s6tvsaklj4hvth02ihmu264823rrf.apps.googleusercontent.com',
    iosClientId: '867678872994-mjd8n6qropannnnm87m64qd94dckqd04.apps.googleusercontent.com',
    androidClientId: '867678872994-4a7li380kip2nr5mio2mq0kmug51b98j.apps.googleusercontent.com',
  });

  const [FBrequest, FBresponse, FBpromptAsync] = Facebook.useAuthRequest({
    clientId: '815881106140589',
    responseType: ResponseType.Code,
  });

  // React.useEffect(() => {
  //   if (response?.type === 'success') {
  //     const { authentication } = response;
  //     console.log(authentication.accessToken, "Google accessToken")
  //   }
  // }, [response]);

  // React.useEffect(() => {
  //   if (FBresponse?.type === 'success') {
  //     const { access_token } = FBresponse.params;
  //     console.log(access_token, "fb token")
  //   }
  // }, [FBresponse]);

  const googleLogin = async () => {
    const response = await promptAsync();
    const { authentication } = response;
    setGlobalState({ ...globalState, authenticatedToken: authentication.accessToken });
    console.log(authentication.accessToken, 'Google accessToken');
  };


  const fbLogin = async () => {
    await FBpromptAsync();
    console.log('facebook login');
  };

  const logout = () => setGlobalState({ ...globalState, authenticatedToken: null });

  return (
    <BackgroundView>
      <Heading style={styles.heading} />
      <View style={styles.container}>
        <AuthForm logout={logout} googleLogin={googleLogin} facebookLogin={fbLogin} />
      </View>
    </BackgroundView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  root: {

  },

  heading: {
    marginLeft: '7%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});