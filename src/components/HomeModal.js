import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  LayoutAnimation,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {asserts, COLORS, FONTS, ROUTES} from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HomeModal = ({isModalVisible, setIsModalVisible}) => {
  const navigation = useNavigation();

  const onPress = () => navigation.navigate(ROUTES.new_task_screen);

  const pressHandler = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsModalVisible(false);
  };

  return (
    <Modal visible={isModalVisible} transparent>
      <Pressable onPress={pressHandler} style={styles.container}>
        <StatusBar
          animated={true}
          barStyle={'dark-content'}
          backgroundColor={COLORS.modalBackground}
        />

        <View style={styles.popup}>
          <View style={styles.top}>
            <Text style={styles.text}>Organise yourself</Text>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.text}>Click</Text>
            <Pressable onPress={onPress} style={styles.imgContainer}>
              <Image
                resizeMode="contain"
                style={{height: 6, width: 6}}
                source={asserts.addTask}
              />
            </Pressable>
            <Text style={styles.text}>to add your tasks</Text>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default HomeModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.modalBackground,
  },
  popup: {
    height: hp(16.2),
    width: wp(75),
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
  },
  top: {
    flex: 2,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  text: {
    color: COLORS.modalText,
    fontFamily: FONTS.LatoRegular,
    fontWeight: '600',
    fontSize: 16,
  },
  imgContainer: {
    height: 17,
    width: 17,
    backgroundColor: COLORS.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
});
