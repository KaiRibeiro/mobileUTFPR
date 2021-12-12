import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Modal, Pressable, ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DetalhesAmbiente = props => {
  const navigation = useNavigation();
  return (
    <Modal
      presentationStyle="overFullScreen"
      animationType="fade"
      transparent={true}
      visible={props.detalhesAmbienteVisible}
      onRequestClose={() => {
        props.setDetalhesAmbienteVisible(!props.detalhesAmbienteVisible);
      }}>
      <Pressable
        style={styles.backdrop}
        onPress={() => {
          navigation.navigate('Ambientes');
          props.setDetalhesAmbienteVisible(false);
        }}
      />
      <View style={styles.caixaAlerta}>
        <ScrollView style={(styles.caixaConteudo, styles.container)}>
          <View style={styles.containerHeader}>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>
              Detalhes Ambiente
            </Text>
            <Icon
              name="close"
              size={40}
              color="white"
              onPress={() => {
                props.setDetalhesAmbienteVisible(false);
              }}
            />
          </View>
          <View style={styles.containerImagem}>
            <Image
              source={{uri: props.imagem}}
              style={{width: 315, height: 175, borderRadius: 10}}
            />
          </View>
          <View style={styles.containerTitulo}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
                color: '#323160',
                width: 200,
              }}>
              {props.nomeAmbiente}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}>
              <Text style={{fontSize: 20, color: 'black'}}>
                {props.lotacaoAmbiente}
              </Text>
              <Icon name="perm-identity" size={32} color="black" />
            </View>
          </View>
          <View style={styles.containerDescricao}>
            <View style={{width: '70%'}}>
              <Text style={{color: 'black', fontSize: 20}}>
                {props.descricaoAmbiente}
              </Text>
            </View>
          </View>
        </ScrollView>
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
    elevation: 3,
  },
  containerImagem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 35,
  },
  containerTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  containerDescricao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    margin: 35,
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    borderColor: 'black',
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
};

export default DetalhesAmbiente;
