import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const Header = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styles.containerHeader}>
      <Icon
        name="menu"
        size={50}
        color="#5C96ED"
        onPress={() => navigation.toggleDrawer()}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Início')}>
        <Image source={require('../assets/images/topbarLogo.png')} />
      </TouchableOpacity>
      <Icon
        name="logout"
        size={50}
        color="#5C96ED"
        onPress={() => dispatch({type: 'LOGOUT'})}
      />
    </View>
  );
};

const styles = {
  containerHeader: {
    alignSelf: 'stretch',
    height: 52,
    flexDirection: 'row',
    backgroundColor: '#323160',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 30,
  },
};

export default Header;
