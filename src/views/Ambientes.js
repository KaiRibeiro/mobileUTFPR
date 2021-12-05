import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import Header from '../components/Header';

const Ambientes = ({navigation}) => {
  return (
    <View style={styles.containerPrincipal}>
      <Header />
      <Text>Ambientessssss</Text>
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

export default Ambientes;
