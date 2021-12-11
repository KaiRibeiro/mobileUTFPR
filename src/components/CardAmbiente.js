import storage from '@react-native-firebase/storage';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, Pressable, Text, View} from 'react-native';
import {Divider, Menu} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DetalhesAmbiente from './DetalhesAmbiente';
import AlertaRemover from './AlertaRemover';

const CardAmbiente = props => {
  const [urlImagem, setUrlImagem] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [carregando, setCarregando] = useState(0);
  const [menuVisivel, setMenuVisivel] = useState(false);
  const [alertaRemoverVisivel, setAlertaRemoverVisivel] = useState(false);

  const remover = () => {
    setAlertaRemoverVisivel(true);
  };

  const abrirMenu = () => setMenuVisivel(true);

  const fecharMenu = () => setMenuVisivel(false);

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
      <AlertaRemover
        alertaRemoverVisivel={alertaRemoverVisivel}
        setAlertaRemoverVisivel={setAlertaRemoverVisivel}
        refresh={props.refresh}
        setRefresh={props.setRefresh}
        tela={'ambientes'}
        id={props.idAmbiente}
      />
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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
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
          <Menu
            visible={menuVisivel}
            onDismiss={fecharMenu}
            anchor={
              <Icon
                onPress={abrirMenu}
                name="more-vert"
                size={30}
                color="black"
              />
            }>
            <Menu.Item
              onPress={() => setModalVisible(true)}
              title="Visualizar"
            />
            <Menu.Item onPress={remover} title="Editar" />
            <Divider />
            <Menu.Item onPress={remover} title="Remover" />
          </Menu>
        </View>

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
