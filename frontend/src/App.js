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

import RecetteCreation from "./pages/creationPages/RecetteCreation";

import { Routes, Route } from 'react-router-dom';
import MessageHome from "./pages/message/MessageHome";
import Message from "./pages/message/Message";

// Pages de création
import RecetteCreation from "./pages/creationPages/RecetteCreation";
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
                <Route path={"/messageHome"} element={<MessageHome/>}/>
                <Route path={"/message"} element={<Message/>}/>/
            </Routes>
        </div>
      </div>
  );
}

export default App;
