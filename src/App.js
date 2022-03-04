// Importar dependencias
import { useContext } from 'react';

//Importar Assets
import './App.css';

import { AppRouter } from './routers/AppRouter';
import { UnauthRouter } from './routers/UnauthRouter'

import AuthContext from './context/AuthContext';

function App() {

  const { auth } = useContext(AuthContext);

  return (
    <div className='App'>
      {auth ? <AppRouter /> : <UnauthRouter />}
    </div >
  );
}

export default App;
