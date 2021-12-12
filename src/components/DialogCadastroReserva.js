import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Keyboard,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AlertaCustomizado from '../components/AlertaCustomizado';
import CardAmbiente from './CardAmbiente';

const DialogCadastroReserva = props => {
  const [msgTipo, setMsgTipo] = useState();
  const [msg, setMsg] = useState();
  const [carregando, setCarregando] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [ambientes, setAmbientes] = useState();
  const [pesquisa, setPesquisa] = useState('');
  const [idAmbienteSelecionado, setIdAmbienteSelecionado] = useState();
  const [data, setData] = useState(new Date());
  const [dataString, setDataString] = useState();
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  let listaAmbientes = [];

  const navigation = useNavigation();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}
      onShow={() => {
        firestore()
          .collection('ambientes')
          .get()
          .then(async resultado => {
            await resultado.docs.forEach(doc => {
              if (doc.data().nome.indexOf(pesquisa) >= 0) {
                listaAmbientes.push({
                  id: doc.id,
                  ...doc.data(),
                });
              }
            });
            setAmbientes(listaAmbientes);
          });
        setIdAmbienteSelecionado(null);
        setDataString(null);
      }}>
      <Pressable
        style={styles.backdrop}
        onPress={() => {
          navigation.navigate('Ambientes');
          props.setModalVisible(false);
        }}
      />
      {carregando ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={300} color="#5C96ED" />
        </View>
      ) : (
        <View style={styles.caixaAlerta}>
          <AlertaCustomizado
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            msgTipo={msgTipo}
            msg={msg}
          />
          <DatePicker
            title='Selecione a data'
            modal
            open={mostrarDatePicker}
            date={data}
            mode={'date'}
            locale={'pt-BR'}
            confirmText={'Confirmar'}
            cancelText={'Cancelar'}
            onConfirm={data => {
                setMostrarDatePicker(false);
              setData(data);
              setDataString(data.toLocaleDateString('pt-BR'))
              setMostrarDatePicker(false);
            }}
            onCancel={() => {
              setMostrarDatePicker(false);
            }}
          />
          <View style={(styles.caixaConteudo, styles.container)}>
            <View style={styles.containerHeader}>
              <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>
                Nova Reserva
              </Text>
              <Icon
                name="close"
                size={40}
                color="white"
                onPress={() => {
                  props.setModalVisible(false);
                }}
              />
            </View>
            <View>
              <FlatList
                horizontal
                snapToAlignment={'center'}
                keyExtractor={item => item.id}
                data={ambientes}
                renderItem={({item}) => (
                  <CardAmbiente
                    idAmbiente={item.id}
                    nomeAmbiente={item.nome}
                    descricaoAmbiente={item.descricao}
                    lotacaoAmbiente={item.lotacao}
                    reserva={true}
                    setIdAmbienteSelecionado={setIdAmbienteSelecionado}
                    idAmbienteSelecionado={idAmbienteSelecionado}
                  />
                )}
                ListEmptyComponent={() => (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      Não há ambientes cadastrados
                    </Text>
                  </View>
                )}
              />
            </View>
            <View style={styles.formContainer}>
              <Pressable
                onPress={() => {
                  setMostrarDatePicker(true);
                }}
                style={styles.inputContainer}>
                <Icon name="date-range" size={32} color="#5C96ED" />
                <Text>Data *: {dataString}</Text>
              </Pressable>
              <View style={styles.inputContainer}>
                <Icon name="perm-identity" size={32} color="#5C96ED" />
                <TextInput
                  style={styles.input}
                  placeholder="Qnt. Pessoas *"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.btnSalvar}>
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
      )}
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
  selecionado: {
    backgroundColor: 'red',
  },
  inputContainerDescricao: {
    marginTop: 15,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 10,
    width: 350,
    height: 207,
    elevation: 3,
  },
};

export default DialogCadastroReserva;
