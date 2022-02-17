// Importar dependencias
import { useContext } from 'react';

//Importar Assets
import './App.css';

import { AppRouter } from './routers/AppRouter';
import { UnauthRouter } from './routers/UnauthRouter'
import { CashProvider } from './context/CashContext';
import AuthContext from './context/AuthContext';
import { SellTicketProvider } from './context/SellTicketContext';



function App() {

  const { auth } = useContext(AuthContext);


  return (

    <div className='App'>

      <SellTicketProvider>
        <CashProvider>
          {auth ? <AppRouter /> : <UnauthRouter />}
        </CashProvider>
      </SellTicketProvider>

    </div >
  );
}

export default App;
