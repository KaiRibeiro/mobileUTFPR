import * as React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import usuarioReducer from './src/store/usuarioReducer';
import {Route} from './src/navigation/routes';

const store = createStore(usuarioReducer);

const App = () => {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};
export default App;
