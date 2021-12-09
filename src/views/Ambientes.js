import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Image, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import DialogCadastroAmbientes from '../components/DialogCadastroAmbientes';

const Ambientes = ({navigation}) => {
  const [carregando, setCarregando] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.containerPrincipal}>
      <Header />
      <DialogCadastroAmbientes
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
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
        <Icon name="search" size={20} color="#5C96ED" />
        <TextInput style={styles.input} placeholder="Buscar" />
      </View>
    </View>
  );
};

const styles = {
  containerPrincipal: {
    flex: 1,
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
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#5C96ED',
    width: 275,
  },
  input: {
    backgroundColor: 'white',
    height: 45,
  },
};

export default Ambientes;
