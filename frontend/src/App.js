import './App.css';

// Navigation des pages
import MenuBar from "./components/menu/MenuBar";
import { Routes, Route } from 'react-router-dom';

// Onglets principaux
import RecetteSearch from "./pages/searchPage/RecetteSearchPage"
import RestaurantSearch from "./pages/searchPage/RestaurantSearchPage"
import CommunauteSearch from "./pages/searchPage/CommunauteSearchPage"
import PartageSearch from "./pages/searchPage/PartageSearchPage"

// Onglets personnels
import Favoris from "./pages/favori/Favori"
import Messages from "./pages/Messages" //A faire
import Profil from "./pages/profil/Profil"

// Les pages de profils
import Inscription from "./pages/Inscription/Inscription";
import Connexion from "./pages/connexion/Connexion";
import PasswordModification from "./pages/passwordModification/PasswordModification";

// Les pages d'affichage individuel
import CommunautePage from "./pages/InformationPages/CommunautePage";
import RecettePage from "./pages/InformationPages/RecettePage";

// Pages de création
import RecetteCreation from "./pages/creationPages/RecetteCreation";
import CommunauteCreation from "./pages/creationPages/CommunauteCreation";
import PartageCreation from "./pages/creationPages/PartageCreation";

import React from "react";

function App() {
  return (
      <div className="App">
        <MenuBar/>
        <div className="container">
            <Routes>
                <Route path="/" element={<RecetteSearch/>}/>

                {/* Onglets principaux */}
                <Route path="/recette" element={<RecetteSearch/>}/>
                <Route path="/restaurant" element={<RestaurantSearch/>}/>
                <Route path="/communaute" element={<CommunauteSearch/>}/>
                <Route path="/partage" element={<PartageSearch/>}/>

                {/* Onglets personnels */}
                <Route path="/favoris" element={<Favoris/>}/>
                <Route path="/messages" element={<Messages/>}/>
                {/*<Route path="/profil" element={<Profil/>}/>*/}
                <Route path="/profil/:pseudo" element={<Profil />} />
                <Route path="/profil" element={<Profil />} />
                />
                  
                <Route path="/inscription" element={<Inscription/>} />

                {/* Les pages de "Profil" */}
                <Route path="/inscription" element={<Inscription/>} />
                <Route path="/modificationMotDePasse" element={<PasswordModification/>} />
                <Route path="/connexion" element={<Connexion/>} />

                {/* Page d'information */}
                <Route path={"/recette/:id"} element={<RecettePage/>}/>
                <Route path="/restaurant/:id" element={<RestaurantPage />} />

                {/* Les pages de Création */}
                <Route path="/createRecette" element={<RecetteCreation/>}/>
                <Route path="/createCommunaute" element={<CommunauteCreation/>}/>
                <Route path="/createPartage" element={<PartageCreation/>}/>
                  
                {/*Les pages d'affichage individuel*/}
                <Route path="/postCommunaute" element={<CommunautePage/>}/>
                <Route path="/recettePage" element={<RecettePage/>}/>
            </Routes>
        </div>
      </div>
  );
}

export default App;
