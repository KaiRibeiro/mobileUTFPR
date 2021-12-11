import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AlertaCustomizado from '../components/AlertaCustomizado';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [msg, setMsg] = useState();
  const [carregando, setCarregando] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const authenticate = () => {
    setCarregando(1);
    setMsgTipo(null);

    if (!email || !senha) {
      setCarregando(0);
      setMsgTipo('erro');
      setMsg('Por favor preencha todos os campos.');
      setModalVisible(true);
    } else {
      auth()
        .signInWithEmailAndPassword(email, senha)
        .then(resultado => {
          setMsgTipo('ok');
          dispatch({
            type: 'LOGIN',
            usuarioEmail: email,
            usuarioId: resultado.user.uid,
          });
        })
        .catch(erro => {
          setMsgTipo('erro');
          setMsg(
            'Por favor, verifique se o seu e-mail e senha estão corretos, ou crie uma conta.'
          );
          setModalVisible(true);
        });
    }
  };

  return (
    <SafeAreaView style={styles.containerPrincipal}>
      <AlertaCustomizado
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        msgTipo={msgTipo}
        msg={msg}
      />
      <View style={styles.voltar}>
        <TouchableOpacity onPress={() => navigation.navigate('Principal')}>
          <Image source={require('../assets/images/voltar.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.logo}>
        <Image source={require('../assets/images/minilogo.png')} />
      </View>
      <View style={styles.containerForm}>
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={e => setEmail(e)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock-outline" size={20} color="black" />
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Senha"
            onChangeText={e => setSenha(e)}
          />
        </View>
      </View>
      <View style={styles.entrarContainer}>
        <Text style={styles.text}>Não tem uma conta?</Text>
        <Text
          style={styles.textLink}
          onPress={() => navigation.navigate('Cadastro')}>
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
        <TouchableOpacity style={styles.btnEntrar} onPress={authenticate}>
          <Text style={styles.textoBtn}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
