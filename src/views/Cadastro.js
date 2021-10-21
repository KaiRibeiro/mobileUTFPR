import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const Cadastro = ({navigation}) => {
  return (
    <View style={styles.containerPrincipal}>
      <View style={styles.voltar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/voltar.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  containerPrincipal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#323160',
  },
  voltar: {
    alignSelf: 'flex-start',
    margin: 15,
  },
  logo: {
    marginTop: 14,
  },
  containerBotoes: {
    marginTop: 30,
  },
  btnEntrar: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#5C96ED',
  },
  textoBtn: {
    fontSize: 18,
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  btnCadastrar: {
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderColor: '#5C96ED',
  },
};

export default Cadastro;
