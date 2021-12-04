import React from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Login = ({navigation}) => {
  return (
    <View style={styles.containerPrincipal}>
      <View style={styles.voltar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/voltar.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.logo}>
        <Image source={require('../assets/images/minilogo.png')} />
      </View>
      <View style={styles.containerForm}>
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="black" />
          <TextInput style={styles.input} placeholder="Email" />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock-outline" size={20} color="black" />
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Senha"
          />
        </View>
      </View>
      <View style={styles.entrarContainer}>
        <Text style={styles.text}>Não tem uma conta?</Text>
        <Text
          style={styles.textLink}
          onPress={() => navigation.navigate('Principal')}>
          {' '}
          Cadastre-se
        </Text>
      </View>
      <View style={styles.entrarContainer}>
        <Text style={styles.text}>Esqueceu sua senha?</Text>
        <Text
          style={styles.textLink}
          onPress={() => navigation.navigate('Principal')}>
          {' '}
          Entre
        </Text>
      </View>
      <View style={styles.containerBotoes}>
        <TouchableOpacity style={styles.btnEntrar}>
          <Text style={styles.textoBtn}>Entrar</Text>
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
  containerForm: {
    marginTop: 60,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  textLink: {
    color: '#5C96ED',
    fontWeight: 'bold',
    fontSize: 15,
  },
  entrarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  textoBtn: {
    fontSize: 18,
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  containerBotoes: {
    marginTop: 30,
  },
  btnEntrar: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#5C96ED',
    width: 250,
  },
  input: {
    backgroundColor: 'white',
    width: 275,
    height: 40,
  },
};

export default Login;
