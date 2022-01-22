//Importar Assets
import './App.css';

import { AuthorizedRouter } from './routers/AuthorizedRouter';
//import { UnauthorizedRouter } from './routers/UnauthorizedRouter';



function App() {
  return (

    <div className='App'>
      <AuthorizedRouter />
      {/* <UnauthorizedRouter /> */}
    </div >
  );
}

export default App;
