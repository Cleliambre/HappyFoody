import './App.css';

// Navigation des pages
import MenuBar from "./components/menu/MenuBar";
import { Routes, Route } from 'react-router-dom';

// Onglets principaux
import RecetteSearch from "./pages/searchPage/RecetteSearchPage"
import RestaurantSearch from "./pages/searchPage/RestaurantSearchPage"
import CommunauteSearch from "./pages/searchPage/CommunauteSearchPage"
import PartageSearch from "./pages/searchPage/PartageSearchPage"

import RecetteInformation from "./pages/InformationPages/RecettePage"

// Onglets personnels
import Favoris from "./pages/favori/Favori"
import Messages from "./pages/Messages" //A faire
import Profil from "./pages/profil/Profil"

// Les pages de profils
import Inscription from "./pages/Inscription/Inscription";
import Connexion from "./pages/connexion/Connexion";
import PasswordModification from "./pages/passwordModification/PasswordModification";

// Les Pages de messages
import MessageHome from "./pages/message/MessageHome"; //liste de conversations
import Message from "./pages/message/Message"; //conversation individuelle

// Les pages d'affichage individuel
import CommunautePage from "./pages/InformationPages/CommunautePage";
import RecettePage from "./pages/InformationPages/RecettePage";
import RestaurantPage from "./pages/InformationPages/RestaurantPage";
import PartagePage from "./pages/InformationPages/PartagePage";

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

                <Route path="/recette/:id" element={<RecetteInformation />} />

                {/* Onglets personnels */}
                <Route path="/favoris" element={<Favoris/>}/>
                <Route path="/messages" element={<Messages/>}/>
                {/*<Route path="/profil" element={<Profil/>}/>*/}
                <Route path="/profil/:pseudo" element={<Profil />} />
                <Route path="/profil" element={<Profil />} />

                {/* Les pages de "Profil" */}
                <Route path="/inscription" element={<Inscription/>} />
                <Route path="/modificationMotDePasse" element={<PasswordModification/>} />
                <Route path="/connexion" element={<Connexion/>} />

                {/* Page d'information */}
                <Route path={"/recette/:id"} element={<RecettePage/>}/>
                <Route path="/restaurant/:id" element={<RestaurantPage />} />
                <Route path="/postCommunaute/:id" element={<CommunautePage/>}/>
                <Route path="/partage/:id" element={<PartagePage/>}/>

                {/* Les pages de Création */}
                <Route path="/createRecette" element={<RecetteCreation/>}/>
                <Route path="/createCommunaute" element={<CommunauteCreation/>}/>
                <Route path="/createPartage" element={<PartageCreation/>}/>

                {/*pages de messages*/}
                <Route path={"/messageHome"} element={<MessageHome/>}/>
                <Route path={"/message"} element={<Message/>}/>

            </Routes>
        </div>
      </div>
  );
}

export default App;
