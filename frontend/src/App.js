import './App.css';

import MenuBar from "./menu/MenuBar";

import Recette from "./pages/Recette"
import Restaurant from "./pages/Restaurant"
import Communaute from "./pages/Communaute"
import Partage from "./pages/Partage"

import Messages from "./pages/Messages"
import Profil from "./profil/Profil"

import Inscription from "./Inscription/Inscription";
import Connexion from "./connexion/ConnexionContent";

import { Routes, Route } from 'react-router-dom';
import Favori from "./favori/Favori";
import RecetteCreation from "./creationPages/RecetteCreation";

function App() {




  return (
      <div className="App">
        <MenuBar/>
        <div className="container">
            <Routes>
                <Route path="/" element={<Recette/>}/>

                <Route path="/recette" element={<Recette/>}/>
                <Route path="/restaurant" element={<Restaurant/>}/>
                <Route path="/communaute" element={<Communaute/>}/>
                <Route path="/partage" element={<Partage/>}/>

                <Route path="/messages" element={<Messages/>}/>
                <Route path="/profil" element={<Profil/>}/>
                  
                <Route path="/inscription" element={<Inscription/>} />
                <Route path="/connexion" element={<Connexion/>} />

                <Route path="/favoris" element={<Favori/>}/>
                <Route path="/createRecette" element={<RecetteCreation/>}/>
            </Routes>
        </div>
      </div>
  );
}

export default App;
