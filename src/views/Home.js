import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Text,
  ActivityIndicator,
  View,
  Image,
  ImageBackground,
  Pressable,
  TouchableOpacity
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Header from '../components/Header';
import mockupReservas from '../assets/images/mockupReservas.png';
import piscinaNavegacao from '../assets/images/piscinaNavegacao.jpg';
import { SafeAreaView } from 'react-native-safe-area-context';
import DialogCadastroReserva from '../components/DialogCadastroReserva';

const Home = ({navigation}) => {
  const id = useSelector(state => state.usuarioId);
  const [carregando, setCarregando] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      }),
    [navigation]
  );

  useEffect(() => {
    setCarregando(1);
    if (!id) {
      dispatch({type: 'LOGOUT'});
      setCarregando(0);
    } else {
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
    }
  }, []);

  return (
    <SafeAreaView style={styles.containerPrincipal}>
      <Header />
      <DialogCadastroReserva
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        idUsuario={id}
      />
      {carregando ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={300} color="#5C96ED" />
        </View>
      ) : (
        <View style={styles.containerBoasVindas}>
          <View>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMHBsYWNlaG9sZGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
              }}
              style={{width: 80, height: 80, borderRadius: 50, margin: 5}}
            />
          </View>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
              Oi {user.nome},
            </Text>
            {user.isAdmin ? (
              <Text style={{fontWeight: '300', fontSize: 18, color: 'black'}}>
                Você é um administrador
              </Text>
            ) : (
              <Text style={{fontWeight: '300', fontSize: 18, color: 'black'}}>
                Você é um morador
              </Text>
            )}
          </View>
        </View>
      )}
      {carregando ? null : !user.isAdmin ?
        <TouchableOpacity key={'novaReserva'} style={styles.btnSalvar} onPress={() => {setModalVisible(true)}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    textAlign: 'center',
                  }}>
                  + Nova Reserva
                </Text>
          </TouchableOpacity>
      : null}
      {carregando ? null : [
        user.isAdmin ? [
          <View style={styles.containerNavegacao} key={'navegacao1'}>
          <Text
            style={{
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: 18,
              color: 'black',
            }}>
            Navegação
          </Text>
          <Pressable
            style={styles.containerImagensNavegacao}
            onPress={() => navigation.navigate('Ambientes')}>
            <ImageBackground
              style={styles.containerImagensNavegacao}
              source={piscinaNavegacao}
              resizeMode="cover">
              <View
                style={{
                  backgroundColor: '#95785A99',
                  flex: 1,
                  flexDirection: 'column',
                  width: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                  Ambientes
                </Text>
              </View>
            </ImageBackground>
          </Pressable>
          <Pressable
            style={styles.containerImagensNavegacao}
            onPress={() => navigation.navigate('Reservas')}>
            <ImageBackground
              style={styles.containerImagensNavegacao}
              source={mockupReservas}
              resizeMode="cover">
              <View
                style={{
                  backgroundColor: '#E0DFEF99',
                  flex: 1,
                  flexDirection: 'column',
                  width: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'flex-end',
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                  Reservas
                </Text>
              </View>
            </ImageBackground>
          </Pressable>
        </View>
        ] : [
          <View style={styles.containerNavegacao}  key={'navegacao2'}>
          <Text
            style={{
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: 18,
              color: 'black',
            }}>
            Navegação
          </Text>
          <Pressable
            style={styles.containerImagensNavegacao}
            onPress={() => navigation.navigate('Minhas Reservas')}>
            <ImageBackground
              style={styles.containerImagensNavegacao}
              source={mockupReservas}
              resizeMode="cover">
              <View
                style={{
                  backgroundColor: '#E0DFEF99',
                  flex: 1,
                  flexDirection: 'column',
                  width: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'flex-end',
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                  Minhas Reservas
                </Text>
              </View>
            </ImageBackground>
          </Pressable>
        </View>
        ]
      ]}
    </SafeAreaView>
  );
};

const styles = {
  containerPrincipal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  containerBoasVindas: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSalvar: {
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: '#5C96ED',
    width: 307,
    alignSelf: 'center',
    marginTop: 10,
  },
  containerImagensNavegacao: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
  },
  containerNavegacao: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'left',
    alignSelf: 'stretch',
    padding: 30,
  },
};

export default Home;
