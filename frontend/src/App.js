import logo from './logo.svg';
import './App.css';
import Profil from "./profil/Profil";
import berserker from "./images/berserker.jpeg";

function App() {
  return (
    <div className="App">
        <Profil
            pp ={berserker}
            pseudo="test"
            description="Ceci est un texte de test que j'essaie d'allonger le plus possible pour voir le résultat."
        />
    </div>
  );
}

export default App;
