import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import Principal from '../views/Principal';
import Cadastro from '../views/Cadastro';
import Login from '../views/Login';
import Home from '../views/Home';

const Stack = createNativeStackNavigator();
const deslogadoStack = createNativeStackNavigator();
const logadoStack = createNativeStackNavigator();

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

const TelasLogado = () => (
  <logadoStack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
  </logadoStack.Navigator>
);

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
