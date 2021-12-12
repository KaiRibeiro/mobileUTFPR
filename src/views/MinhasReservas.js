import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
  LogBox,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CardReserva from '../components/CardReserva';
import DialogCadastroAmbientes from '../components/DialogCadastroAmbientes';
import Header from '../components/Header';

const MinhasReservas = ({navigation}) => {
  const id = useSelector(state => state.usuarioId);
  const [carregando, setCarregando] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [reservas, setReservas] = useState();
  const [pesquisa, setPesquisa] = useState('');
  const [user, setUser] = useState();
  let listaReservas = [];

  LogBox.ignoreLogs(['EventEmitter.removeListener']);

  useEffect(() => {
    setCarregando(1);
    firestore()
      .collection('reservas')
      .where('idUsuario', '==', id)
      .get()
      .then(async resultado => {
        await resultado.docs.forEach(doc => {
          if (doc.data().nomeAmbiente.indexOf(pesquisa) >= 0) {
            listaReservas.push({
              id: doc.id,
              ...doc.data(),
            });
          }
        });
        setReservas(listaReservas);
      });
    firestore()
      .collection('usuarios')
      .where('id', '==', id)
      .get()
      .then(resultado => {
        resultado.docs.forEach(doc => {
          setUser(doc.data());
          setCarregando(0);
        });
      })
      .catch(error => {
        dispatch({type: 'LOGOUT'});
        setCarregando(0);
      });
  }, [refresh]);

  return (
    <SafeAreaView style={styles.containerPrincipal}>
      <Header />
      <DialogCadastroAmbientes
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <View style={styles.containerCadastrar}>
        <Text style={{fontWeight: 'bold', fontSize: 24, color: 'black'}}>
          MINHAS RESERVAS
        </Text>
      </View>
      <View style={styles.containerBusca}>
        <TextInput
          onChangeText={e => setPesquisa(e)}
          style={styles.input}
          placeholder="Buscar"
        />
        <Icon
          onPress={() => {
            setRefresh(!refresh);
          }}
          name="search"
          size={50}
          color="#5C96ED"
        />
      </View>
      {carregando ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={300} color="#5C96ED" />
        </View>
      ) : (
        <FlatList
          keyExtractor={item => item.id}
          data={reservas}
          renderItem={({item}) => (
            <CardReserva
              idReserva={item.id}
              nomeAmbiente={item.nomeAmbiente}
              pessoas={item.pessoas}
              dataReserva={item.data}
              nomeUsuario={user.nome}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          )}
          ListEmptyComponent={() => (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
                Não há reservas cadastradas para esse usuário.
              </Text>
            </View>
          )}
          contentContainerStyle={{paddingBottom: '50%', paddingTop: '5%'}}
        />
      )}
    </SafeAreaView>
  );
};

const styles = {
  containerPrincipal: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  containerCadastrar: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  btnNovo: {
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: '#5C96ED',
    width: 150,
  },
  containerBusca: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#5C96ED',
    width: 400,
    paddingLeft: 15,
    paddingRight: 15,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
  },
};

export default MinhasReservas;
