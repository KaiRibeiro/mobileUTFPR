import storage from '@react-native-firebase/storage';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DetalhesAmbiente from './DetalhesAmbiente';

const CardAmbiente = props => {
  const [urlImagem, setUrlImagem] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [carregando, setCarregando] = useState(0);

  useEffect(() => {
    setCarregando(1);
    storage()
      .ref(`ambientes/${props.idAmbiente}`)
      .getDownloadURL()
      .then(url => {
        setCarregando(0);
        setUrlImagem(url);
      })
      .catch(erro => {
        setCarregando(0);
        console.log(erro);
      });
  }, []);

  return (
    <Pressable
      onPress={() => setModalVisible(true)}
      style={{
        flexDirection: 'row',
        backgroundColor: '#00000021',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        height: 200,
        width: 350,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      {carregando ? null : (
        <DetalhesAmbiente
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          idAmbiente={props.idAmbiente}
          nomeAmbiente={props.nomeAmbiente}
          descricaoAmbiente={props.descricaoAmbiente}
          lotacaoAmbiente={props.lotacaoAmbiente}
          imagem={urlImagem}
        />
      )}
      {carregando ? (
        <ActivityIndicator size={100} color="#5C96ED" />
      ) : (
        <Image
          source={{uri: urlImagem}}
          style={{width: 150, height: 150, borderRadius: 10}}
        />
      )}
      <View>
        <Text
          numberOfLines={2}
          style={{
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'left',
            width: 100,
          }}>
          {props.nomeAmbiente}
        </Text>
        <Text
          numberOfLines={5}
          style={{
            color: 'black',
            fontSize: 14,
            fontWeight: '300',
            height: 100,
            width: 100,
            textAlign: 'left',
          }}>
          {props.descricaoAmbiente}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <Text style={{fontSize: 18, color: 'black'}}>
            {props.lotacaoAmbiente}
          </Text>
          <Icon name="perm-identity" size={25} color="black" />
        </View>
      </View>
    </Pressable>
  );
};

const styles = {};

export default CardAmbiente;
