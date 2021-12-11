import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AlertaRemover = props => {
  const removerItem = () => {
    firestore()
      .collection(props.tela)
      .doc(props.id)
      .delete()
      .then(() => {
        props.setRefresh(!props.refresh);
        props.setAlertaRemoverVisivel(false);
      });
  };

  const navigation = useNavigation();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.alertaRemoverVisivel}
      onRequestClose={() => {
        props.setAlertaRemoverVisivel(!props.alertaRemoverVisivel);
      }}>
      <Pressable
        style={styles.backdrop}
        onPress={() => {
          navigation.navigate('Ambientes');
          props.setAlertaRemoverVisivel(false);
        }}
      />
      <View style={styles.caixaAlerta}>
        <ScrollView style={(styles.caixaConteudo, styles.container)}>
          <View style={styles.containerHeader}>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>
              ATENÇÃO
            </Text>
            <Icon
              name="close"
              size={40}
              color="white"
              onPress={() => {
                props.setAlertaRemoverVisivel(false);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 25,
            }}>
            <Icon color="red" name="warning" size={50} />
            {props.tela === 'ambientes' ? (
              <Text style={{fontSize: 18, color: 'black', marginLeft: 10}}>
                Tem certeza que deseja remover esse ambiente? Você nao poderá
                desfazer essa ação.
              </Text>
            ) : (
              <Text style={{fontSize: 18, color: 'black', marginLeft: 10}}>
                Tem certeza que deseja cancelar essa reserva? Você nao poderá
                desfazer essa ação.
              </Text>
            )}
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => {
                props.setAlertaRemoverVisivel(false);
              }}
              style={styles.btnNao}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 14,
                  textAlign: 'center',
                }}>
                NÃO
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={removerItem} style={styles.btnSim}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 14,
                  textAlign: 'center',
                }}>
                SIM
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = {
  containerHeader: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: '#323160',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,
    paddingRight: 20,
    paddingLeft: 20,
    elevation: 3,
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
    maxHeight: 220,
    zIndex: 10,
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
  btnSim: {
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: '#5C96ED',
    width: 150,
    margin: 5,
  },
  btnNao: {
    borderRadius: 10,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    width: 150,
    margin: 5,
  },
};

export default AlertaRemover;
