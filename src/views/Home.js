import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Text, ActivityIndicator, View, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Header from '../components/Header';

const Home = ({navigation}) => {
  const id = useSelector(state => state.usuarioId);
  const [carregando, setCarregando] = useState(1);
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
    <View style={styles.containerPrincipal}>
      <Header />
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
  containerBoasVindas: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Home;
