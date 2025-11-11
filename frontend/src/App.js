import React from "react";
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
import Messages from "./pages/Messages" // TODO : A faire
import Profil from "./pages/profil/Profil"

// TODO : Page favoris

// Les Pages de messages
import MessageHome from "./pages/message/MessageHome"; // TODO : liste de conversations
import Message from "./pages/message/Message"; // TODO : conversation individuelle

// Les pages de profils
import Inscription from "./pages/Inscription/Inscription";
import Connexion from "./pages/connexion/Connexion";
import PasswordModification from "./pages/passwordModification/PasswordModification";

// Les pages d'affichage individuel
import CommunautePage from "./pages/InformationPages/CommunautePage";
import RecettePage from "./pages/InformationPages/RecettePage";
import RestaurantPage from "./pages/InformationPages/RestaurantPage";
import PartagePage from "./pages/InformationPages/PartagePage";

// Pages de création
import RecetteCreation from "./pages/creationPages/RecetteCreation";
import CommunauteCreation from "./pages/creationPages/CommunauteCreation";
import PartageCreation from "./pages/creationPages/PartageCreation";

function App() {
  return (
      <div className="App">
          <MenuBar/>
        <div className="container">
            <Routes>
                <Route path="/" element={ <RecetteSearch/> }/>

                {/* Onglets principaux */}
                <Route path="/recette" element={<RecetteSearch/>}/>
                <Route path="/restaurant" element={<RestaurantSearch/>}/>
                <Route path="/communaute" element={<CommunauteSearch/>}/>
                <Route path="/partage" element={<PartageSearch/>}/>

                {/* Onglets personnels */}
                <Route path="/favoris" element={<Favoris/>}/>
                <Route path="/messages" element={<Messages/>}/>
                <Route path="/profil/:pseudo" element={<Profil />} />

                {/* Les pages de "Profil" */}
                <Route path="/inscription" element={<Inscription/>} />
                <Route path="/modificationMotDePasse" element={<PasswordModification/>} />
                <Route path="/connexion" element={<Connexion/>} />

                {/* Page d'information */}
                <Route path={"/recette/:id"} element={<RecettePage/>}/>
                <Route path="/restaurant/:id" element={<RestaurantPage />} />
                <Route path="/postCommunaute/:id" element={<CommunautePage/>}/>
                <Route path="/partage/:id" element={<PartagePage/>}/>

                {/* Page de commentaires */}
                {/* TODO : mettre les pages de commentaires pour les recettes et restaurants */}

                {/* Les pages de Création */}
                <Route path="/createRecette" element={<RecetteCreation/>}/>
                <Route path="/createCommunaute" element={<CommunauteCreation/>}/>
                <Route path="/createPartage" element={<PartageCreation/>}/>

                {/* Page de favoris */}
                {/* TODO : mettre les favoris */}

                {/* Pages de Messages */}
                <Route path={"/messageHome"} element={<MessageHome/>}/>
                <Route path={"/message"} element={<Message/>}/>

            </Routes>
        </div>
      </div>
  );
}

export default App;
