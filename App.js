import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Principal from './src/views/Principal';
import Cadastro from './src/views/Cadastro';
import Login from './src/views/Login';
import usuarioReducer from './src/store/usuarioReducer';

const Stack = createNativeStackNavigator();
const store = createStore(usuarioReducer);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Principal" component={Principal} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
