


//Importar Assets
import './App.css';
import logo from './LogoDOKO.svg';
import { AppRouter } from './routers/AppRouter';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <AppRouter/>
    </div>

  );
}

export default App;
// <div className="App">

      
    // </div>