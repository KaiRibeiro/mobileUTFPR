import * as React from 'react';
import {Provider} from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import {createStore} from 'redux';
import usuarioReducer from './src/store/usuarioReducer';
import {Route} from './src/navigation/routes';

const store = createStore(usuarioReducer);

const App = () => {
  return (
    <PaperProvider>
      <Provider store={store}>
        <Route />
      </Provider>
    </PaperProvider>
  );
};
export default App;
