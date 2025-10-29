import './App.css';
import ProfilModification from "./profilModification/ProfilModification";
import taboule from "./images/taboule.png"

function App() {
  return (
    <div className="App">
      <ProfilModification
          pseudo={"MariaSalade"}
          pp={taboule}
          description={"Je suis très fan de Salade"}
          email={"maria.salade@gmail.com"}
          mdp={"JAimeLaSaladeCarCEstTropChouette!"}
      />
    </div>
  );
}

export default App;
