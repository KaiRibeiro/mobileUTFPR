import React, {useState} from 'react';
import {
  View,
  Pressable,
  Modal,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import * as imagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import AlertaCustomizado from '../components/AlertaCustomizado';
import piscinaNavegacao from '../assets/images/piscinaNavegacao.jpg';

const DialogCadastroAmbientes = props => {
  const [imagem, setImagem] = useState();
  const [nome, setNome] = useState();
  const [descricao, setDescricao] = useState();
  const [lotacao, setLotacao] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [msg, setMsg] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const imagePickerCallback = resposta => {
    if (resposta.didCancel) {
      console.log('Usuário Cancelou Image Picker');
    } else if (resposta.error) {
      console.log('ImagePicker Error: ', resposta.error);
    } else {
      console.log(resposta.assets[0].uri);
      setImagem(resposta.assets[0].uri);
    }
  };

  const salvar = () => {
    setMsgTipo(null);

    if (!nome || !descricao || !lotacao || !imagem) {
      setMsgTipo('erro');
      setMsg('Por favor preencha todos os campos.');
      setModalVisible(true);
    } else {
      const ambientesCollection = firestore().collection('ambientes');
      ambientesCollection
        .add({
          nome: nome,
          descricao: descricao,
          lotacao: lotacao,
        })
        .then(resultado => {
          storage()
            .ref(`ambientes/${resultado.id}`)
            .putFile(imagem)
            .then(() => {
              setMsgTipo('okAmbiente');
              setMsg('Ambiente cadastrado com sucesso.');
              setModalVisible(true);
            })
            .catch(erro => {
              setMsgTipo('erro');
              setMsg('Falha ao cadastrar ambiente.');
              setModalVisible(true);
            });
        })
        .catch(erro => {
          setMsgTipo('erro');
          setMsg('Falha ao cadastrar ambiente.');
          setModalVisible(true);
        });
    }
  };

  const navigation = useNavigation();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}>
      <Pressable
        style={styles.backdrop}
        onPress={() => {
          props.setModalVisible(false);
        }}
      />
      <View style={styles.caixaAlerta}>
        <AlertaCustomizado
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          msgTipo={msgTipo}
          msg={msg}
        />
        <View style={(styles.caixaConteudo, styles.container)}>
          <View style={styles.containerHeader}>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>
              Novo Ambiente
            </Text>
            <Icon
              name="close"
              size={40}
              color="white"
              onPress={() => props.setModalVisible(false)}
            />
          </View>

          <Pressable
            style={styles.containerImagem}
            onPress={() =>
              imagePicker.launchImageLibrary({}, imagePickerCallback)
            }>
            <ImageBackground
              style={styles.containerImagensNavegacao}
              source={piscinaNavegacao}>
              <Icon name="add" size={150} color="white" />
            </ImageBackground>
          </Pressable>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Icon
                name="drive-file-rename-outline"
                size={32}
                color="#5C96ED"
              />
              <TextInput
                style={styles.input}
                placeholder="Nome do Ambiente *"
                onChangeText={e => setNome(e)}
              />
            </View>
            <View style={styles.inputContainerDescricao}>
              <Icon
                name="drive-file-rename-outline"
                size={32}
                color="#5C96ED"
              />
              <TextInput
                style={styles.input}
                placeholder="Descrição do Ambiente *"
                onChangeText={e => setDescricao(e)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="perm-identity" size={32} color="#5C96ED" />
              <TextInput
                style={styles.input}
                placeholder="Max. Lotação *"
                keyboardType="numeric"
                onChangeText={e => setLotacao(e)}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.btnSalvar} onPress={salvar}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              SALVAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  containerHeader: {
    alignSelf: 'stretch',
    height: 68,
    flexDirection: 'row',
    backgroundColor: '#323160',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,
    paddingRight: 20,
    paddingLeft: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 3,
  },
  containerImagem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  containerImagensNavegacao: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    height: 155,
    width: 225,
  },
  caixaAlerta: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    zIndex: 10,
    height: '100%',
    marginTop: '5%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 53,
  },
  backdrop: {
    position: 'absolute',
    backgroundColor: '#000000',
    opacity: 0.3,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  input: {
    backgroundColor: 'white',
    width: 275,
    height: 40,
  },
  inputContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    width: 350,
    elevation: 3,
  },
  btnSalvar: {
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: '#5C96ED',
    width: 307,
    alignSelf: 'center',
    marginTop: 10,
  },
  inputContainerDescricao: {
    marginTop: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    width: 350,
    height: 207,
    elevation: 3,
  },
};

export default DialogCadastroAmbientes;
