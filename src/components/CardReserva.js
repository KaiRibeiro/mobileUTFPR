import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Menu} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AlertaRemover from './AlertaRemover';

const CardReserva = props => {
  const [menuVisivel, setMenuVisivel] = useState(false);
  const [alertaRemoverVisivel, setAlertaRemoverVisivel] = useState(false);
  let data = props.dataReserva.toDate();

  const remover = () => {
    setAlertaRemoverVisivel(true);
  };

  const abrirMenu = () => setMenuVisivel(true);

  const fecharMenu = () => setMenuVisivel(false);

  return (
    <View
      style={[
        styles.containerCard,
        props.nomeAmbiente === props.nomeAmbienteSelecionado
          ? {borderColor: '#323160', borderWidth: 1}
          : null,
      ]}>
      <AlertaRemover
        alertaRemoverVisivel={alertaRemoverVisivel}
        setAlertaRemoverVisivel={setAlertaRemoverVisivel}
        refresh={props.refresh}
        setRefresh={props.setRefresh}
        tela={'reservas'}
        id={props.idReserva}
      />
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
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'left',
              width: 250,
              height: 80,
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
                color="white"
              />
            }>
            <Menu.Item onPress={remover} title="Remover" />
          </Menu>
        </View>
        <View>
          <Text style={{fontSize: 18, fontWeight: '300', color: 'white'}}>
            Reservado por: {props.nomeUsuario}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Icon name="date-range" size={25} color="white" />
            <Text style={{fontSize: 18, color: 'white'}}>
              {data.toLocaleDateString('pt-BR')}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            <Text style={{fontSize: 18, color: 'white'}}>{props.pessoas}</Text>
            <Icon name="perm-identity" size={25} color="white" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = {
  containerCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    height: 150,
    width: 300,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#323160',
  },
};

export default CardReserva;
