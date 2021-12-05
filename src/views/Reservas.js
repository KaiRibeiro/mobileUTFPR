import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import Header from '../components/Header';

const Reservas = ({navigation}) => {
  return (
    <View style={styles.containerPrincipal}>
      <Header />
      <Text>Reservasss</Text>
    </View>
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

export default Reservas;
