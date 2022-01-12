


//Importar Assets
import './App.css';
import BotonFondoClaro from './components/generic/BotonFondoClaro';
import BotonFondoOscuro from './components/generic/BotonFondoOscuro';
import CanvasClaro from './components/generic/CanvasClaro';
import CanvasOscuro from './components/generic/CanvasOscuro';
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