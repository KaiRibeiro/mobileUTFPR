import React from 'react';
import {View, Pressable, Modal, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const AlertaCustomizado = props => {
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
          if (props.msgTipo === 'erro') {
            props.setModalVisible(false);
          } else if (props.msgTipo === 'ok') {
            navigation.navigate('Login');
            props.setModalVisible(false);
          } else if (props.msgTipo === 'okAmbiente') {
            navigation.navigate('Ambientes');
            props.setModalVisible(false);
          }
        }}
      />
      <View style={styles.caixaAlerta}>
        <View style={(styles.caixaConteudo, styles.container)}>
          {props.msgTipo === 'erro' ? (
            <Icon style={styles.iconeErro} name="error-outline" size={50} />
          ) : (
            <Icon
              style={styles.iconeOk}
              name="check-circle-outline"
              size={50}
            />
          )}
          <Text
            style={[
              props.msgTipo === 'erro' ? styles.tituloErro : styles.tituloOk,
            ]}>
            {[
              props.msgTipo === 'erro'
                ? 'Erro ao Efetuar Cadastro'
                : 'Cadastro Efetuado',
            ]}
          </Text>
          <Text style={styles.mensagem}>{props.msg}</Text>
          <View style={styles.containerBotoes}>
            <TouchableOpacity
              style={styles.btnCadastrar}
              onPress={() => {
                if (props.msgTipo === 'erro') {
                  props.setModalVisible(false);
                } else if (props.msgTipo === 'ok') {
                  navigation.navigate('Login');
                  props.setModalVisible(false);
                } else if (props.msgTipo === 'okAmbiente') {
                  console.log('adawdawdaw');
                  navigation.navigate('Ambientes');
                  props.setModalVisible(false);
                }
              }}>
              <Text style={styles.textoBtn}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  caixaAlerta: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 13,
  },
  container: {
    backgroundColor: 'white',
    maxWidth: 270,
    width: '100%',
    zIndex: 10,
    borderRadius: 13,
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
  tituloErro: {
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 7,
    paddingLeft: 16,
    marginTop: 8,
    textAlign: 'center',
    color: 'red',
    fontSize: 20,
  },
  iconeErro: {
    marginTop: 8,
    textAlign: 'center',
    color: 'red',
  },
  iconeOk: {
    marginTop: 8,
    textAlign: 'center',
    color: 'green',
  },
  tituloOk: {
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 7,
    paddingLeft: 16,
    marginTop: 8,
    textAlign: 'center',
    color: 'green',
    fontSize: 26,
  },
  mensagem: {
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 21,
    paddingLeft: 16,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 16,
  },
  containerBotoes: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 8,
    marginLeft: 24,
    marginRight: 24,
  },
  btnCadastrar: {
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderColor: '#5C96ED',
  },
  textoBtn: {
    fontSize: 18,
    color: '#5C96ED',
    alignSelf: 'center',
  },
};

export default AlertaCustomizado;
