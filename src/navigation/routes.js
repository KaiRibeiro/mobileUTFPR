import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import firestore from '@react-native-firebase/firestore';
import {Text, View, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Principal from '../views/Principal';
import Cadastro from '../views/Cadastro';
import Login from '../views/Login';
import Home from '../views/Home';
import Ambientes from '../views/Ambientes';
import Reservas from '../views/Reservas';

const Stack = createNativeStackNavigator();
const deslogadoStack = createNativeStackNavigator();
const logadoDrawer = createDrawerNavigator();

const TelasDeslogado = () => (
  <deslogadoStack.Navigator>
    <Stack.Screen
      name="Principal"
      component={Principal}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Cadastro"
      component={Cadastro}
      options={{headerShown: false}}
    />
  </deslogadoStack.Navigator>
);

const DrawerCustomizada = props => {
  const id = useSelector(state => state.usuarioId);
  const [carregando, setCarregando] = useState(1);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

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
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
          backgroundColor: '#323160',
          marginBottom: 20,
        }}>
        {carregando ? null : (
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
              {user.nome}
            </Text>
            <Text style={{fontWeight: '200', fontSize: 13, color: 'white'}}>
              {user.email}
            </Text>
          </View>
        )}
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMHBsYWNlaG9sZGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
          }}
          style={{width: 80, height: 80, borderRadius: 50}}
        />
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

const TelasLogado = () => {
  const id = useSelector(state => state.usuarioId);
  const [carregando, setCarregando] = useState(1);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

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
    <logadoDrawer.Navigator
      drawerContent={props => <DrawerCustomizada {...props} />}
      drawerType="front"
      initialRouteName="Profile"
      screenOptions={{
        drawerActiveTintColor: '#323160',
        drawerInactiveTintColor: '#5C96ED',
        drawerActiveBackgroundColor: '#32316033',
        itemStyle: {marginVertical: 10},
      }}>
      <Stack.Screen
        name="Início"
        component={Home}
        options={{
          headerShown: false,
          drawerIcon: ({focused}) => (
            <Icon
              name="home"
              size={20}
              color={focused ? '#323160' : '#5C96ED'}
            />
          ),
        }}
      />
      {carregando
        ? null
        : [
            user.isAdmin ? (
              <Stack.Screen
                name="Ambientes"
                key={user.id}
                component={Ambientes}
                options={{
                  headerShown: false,
                  drawerIcon: ({focused}) => (
                    <Icon
                      name="apartment"
                      size={20}
                      color={focused ? '#323160' : '#5C96ED'}
                    />
                  ),
                }}
              />
            ) : null,
          ]}

      {carregando
        ? null
        : [
            user.isAdmin ? (
              <Stack.Screen
                name="Reservas"
                key={user.id}
                component={Reservas}
                options={{
                  headerShown: false,
                  drawerIcon: ({focused}) => (
                    <Icon
                      name="assignment"
                      size={20}
                      color={focused ? '#323160' : '#5C96ED'}
                    />
                  ),
                }}
              />
            ) : null,
          ]}
    </logadoDrawer.Navigator>
  );
};

export const Route = () => {
  const logado = useSelector(state => state.usuarioLogado > 0);
  return (
    <NavigationContainer>
      {logado ? (
        <TelasLogado options={{animationEnabled: false}} />
      ) : (
        <TelasDeslogado options={{animationEnabled: false}} />
      )}
    </NavigationContainer>
  );
};
