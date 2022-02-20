// Importar dependencias
import { useContext } from 'react';

//Importar Assets
import './App.css';

import { AppRouter } from './routers/AppRouter';
import { UnauthRouter } from './routers/UnauthRouter'
import { CashProvider } from './context/CashContext';
import AuthContext from './context/AuthContext';
import { SellTicketProvider } from './context/SellTicketContext';
import { ProductProvider } from './context/ProductContext';



function App() {

  const { auth } = useContext(AuthContext);


  return (

    <div className='App'>

      <SellTicketProvider>
        <CashProvider>
          <ProductProvider>
            {auth ? <AppRouter /> : <UnauthRouter />}
          </ProductProvider>
        </CashProvider>
      </SellTicketProvider>

    </div >
  );
}

export default App;
