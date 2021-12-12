import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

const MinhasReservas = ({navigation}) => {
  return (
    <SafeAreaView style={styles.containerPrincipal}>
      <Header />
      <Text>Minhas Reservasss</Text>
    </SafeAreaView>
  );
};

const styles = {
  containerPrincipal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
};

export default MinhasReservas;
