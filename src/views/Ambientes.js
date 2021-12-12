import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  LogBox,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CardAmbiente from '../components/CardAmbiente';
import DialogCadastroAmbientes from '../components/DialogCadastroAmbientes';
import Header from '../components/Header';

const Ambientes = ({navigation}) => {
  const [carregando, setCarregando] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [ambientes, setAmbientes] = useState();
  const [pesquisa, setPesquisa] = useState('');
  let listaAmbientes = [];

  LogBox.ignoreLogs(['EventEmitter.removeListener']);

  useEffect(() => {
    Keyboard.dismiss();
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
          AMBIENTES
        </Text>
        <TouchableOpacity
          style={styles.btnNovo}
          onPress={() => setModalVisible(true)}>
          <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
            + Novo
          </Text>
        </TouchableOpacity>
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
      <FlatList
        keyExtractor={item => item.id}
        data={ambientes}
        renderItem={({item}) => (
          <CardAmbiente
            idAmbiente={item.id}
            nomeAmbiente={item.nome}
            descricaoAmbiente={item.descricao}
            lotacaoAmbiente={item.lotacao}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        )}
        ListEmptyComponent={() => (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
              Não há ambientes cadastrados
            </Text>
          </View>
        )}
        contentContainerStyle={{paddingBottom: '50%', paddingTop: '5%'}}
      />
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
    justifyContent: 'space-between',
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

export default Ambientes;
