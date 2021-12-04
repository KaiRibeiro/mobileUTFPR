import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';

const Home = ({navigation}) => {
  
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
      }),
    [navigation]
  );

  return (
    <View style={styles.containerPrincipal}>
      <Text>HOMEEEEE</Text>
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

export default Home;
