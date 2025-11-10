import './App.css';

import MenuBar from "./components/menu/MenuBar";

import RecetteSearch from "./pages/searchPage/RecetteSearchPage"
import RestaurantSearch from "./pages/searchPage/RestaurantSearchPage"
import CommunauteSearch from "./pages/searchPage/CommunauteSearchPage"
import PartageSearch from "./pages/searchPage/PartageSearchPage"

import RecetteInformation from "./pages/InformationPages/RecettePage"

import Favoris from "./pages/favori/Favori"
import Messages from "./pages/Messages" //A faire
import Profil from "./pages/profil/Profil"

import Inscription from "./pages/Inscription/Inscription";
import Connexion from "./pages/connexion/Connexion";

import PasswordModification from "./pages/passwordModification/PasswordModification";

import RecetteCreation from "./pages/creationPages/RecetteCreation";

import { Routes, Route } from 'react-router-dom';


function App() {
  return (
      <div className="App">
        <MenuBar/>
        <div className="container">
            <Routes>
                <Route path="/" element={<RecetteSearch/>}/>

                <Route path="/recette" element={<RecetteSearch/>}/>
                <Route path="/restaurant" element={<RestaurantSearch/>}/>
                <Route path="/communaute" element={<CommunauteSearch/>}/>
                <Route path="/partage" element={<PartageSearch/>}/>

                <Route path="/recette/:id" element={<RecetteInformation />} />

                <Route path="/favoris" element={<Favoris/>}/>
                <Route path="/messages" element={<Messages/>}/>
                <Route path="/profil" element={<Profil/>}/>
                  
                <Route path="/inscription" element={<Inscription/>} />

                <Route path="/modificationMotDePasse" element={<PasswordModification/>} />
                <Route path="/connexion" element={<Connexion/>} />

                <Route path="/createRecette" element={<RecetteCreation/>}/>
            </Routes>
        </div>
      </div>
  );
}

export default App;
