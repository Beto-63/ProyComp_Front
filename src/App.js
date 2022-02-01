//Importar Assets
import './App.css';

import { AppRouter } from './routers/AppRouter';
import CashRegister from './pages/CashRegister';
import { CashProvider } from './context/CashContext';



function App() {
  return (

    <div className='App'>

      <CashProvider>
        <AppRouter />
      </CashProvider>


    </div >
  );
}

export default App;
