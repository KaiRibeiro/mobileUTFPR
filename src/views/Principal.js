import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';

const Principal = ({navigation}) => {
  return (
    <View style={styles.containerPrincipal}>
      <View style={styles.logo}>
        <Image source={require('../assets/images/logo.png')} />
      </View>
      <View style={styles.logo}>
        <Image source={require('../assets/images/pessoas.png')} />
      </View>
      <View style={styles.containerBotoes}>
        <TouchableOpacity style={styles.btnEntrar}>
          <Text style={styles.textoBtn}>Entrar</Text>
        </TouchableOpacity>
        <Image
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginTop: 15,
            marginBottom: 15,
          }}
          source={require('../assets/images/ou.png')}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Cadastro')}
          style={styles.btnCadastrar}>
          <Text style={styles.textoBtn}>Cadastrar</Text>
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

export default Principal;
