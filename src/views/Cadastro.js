import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from '../config/firebase.js';
import firestore from '@react-native-firebase/firestore';
import AlertaCustomizado from '../components/AlertaCustomizado';

const Cadastro = ({navigation}) => {
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [msg, setMsg] = useState();
  const [carregando, setCarregando] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const cadastrar = () => {
    setCarregando(1);
    setMsgTipo(null);

    if (!email || !senha || !nome) {
      setCarregando(0);
      setMsgTipo('erro');
      setMsg('Por favor preencha todos os campos.');
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then((resultado) => {
          const usersRef = firestore.collection('users');
          usersRef.add({
            id: resultado.user.uid,
            nome: nome,
            email: email,
          })
          .then((resultado) => {
            console.log('aaa');
            setCarregando(0);
            setMsgTipo('ok');
          })
          .catch((erro) => {
            setCarregando(0);
            setMsgTipo('erro');
            console.log(erro)
          });
          setCarregando(0);
          setMsgTipo('ok');
          setMsg('Usuário cadastrado com sucesso.');
          setModalVisible(true);
        })
        .catch((erro) => {
          setCarregando(0);
          setMsgTipo('erro');
          switch (erro.message) {
            case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
              setMsg('A senha deve ter pelo menos 6 caracteres.');
              break;
            case 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).':
              setMsg('Esse email já está em uso.');
              break;
            case 'Firebase: The email address is badly formatted. (auth/invalid-email).':
              setMsg('O formato de email é inválido.');
              break;
            default:
              setMsg(
                'Não foi possível cadastrar. Por favor, tente novamente mais tarde.'
              );
              break;
          }
          setModalVisible(true);
        });
    }
  };

  return (
    <View style={styles.containerPrincipal}>
        <AlertaCustomizado
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          msgTipo={msgTipo}
          msg={msg}
        />
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
          <Icon name="perm-identity" size={20} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Nome"
            onChangeText={e => setNome(e)}
          />
        </View>
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
        <Text style={styles.text}>Já tem uma conta?</Text>
        <Text
          style={styles.textLink}
          onPress={() => navigation.navigate('Principal')}>
          {' '}
          Entre
        </Text>
      </View>
      <View style={styles.containerBotoes}>
        <TouchableOpacity style={styles.btnCadastrar} onPress={cadastrar}>
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
  },
  textoBtn: {
    fontSize: 18,
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  containerBotoes: {
    marginTop: 30,
  },
  btnCadastrar: {
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

export default Cadastro;
