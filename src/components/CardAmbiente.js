import React, {useEffect, useState} from 'react';
import storage from '@react-native-firebase/storage';
import {View, Pressable, Modal, Text, Card, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CardAmbiente = props => {
  const [urlImagem, setUrlImagem] = useState();
  const [carregando, setCarregando] = useState(0);

  useEffect(() => {
    storage()
      .ref(`ambientes/${props.idAmbiente}`)
      .getDownloadURL()
      .then(url => {
        setUrlImagem(url);
      })
      .catch(erro => {
        console.log(erro);
      });
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#00000021',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        height: 200,
        width: 350,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Image
        source={{uri: urlImagem}}
        style={{width: 150, height: 150, borderRadius: 10}}
      />
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'left',
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
      </View>

      <Text>{props.lotacaoAmbiente}</Text>
    </View>
  );
};

const styles = {};

export default CardAmbiente;
