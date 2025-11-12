import React from "react";
import './App.css';

// Navigation des pages
import { Routes, Route } from 'react-router-dom';
import MenuBar from "./components/menu/MenuBar";
import ScrollToTop from "./components/ScrollToTop";

// Onglets principaux
import RecetteSearch from "./pages/searchPage/RecetteSearchPage"
import RestaurantSearch from "./pages/searchPage/RestaurantSearchPage"
import CommunauteSearch from "./pages/searchPage/CommunauteSearchPage"
import PartageSearch from "./pages/searchPage/PartageSearchPage"

// Onglets personnels
import Favoris from "./pages/favori/Favori"
import MessageHome from "./pages/message/MessageHome";
import Message from "./pages/message/Message";
import Profil from "./pages/profil/Profil"

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

const routes = [

    // ==================== PAGES PRINCIPAUX ====================

    // Page d'accueil
    { path: "/", element: <RecetteSearch /> },

    // Onglets de recherche principaux
    { path: "/recette", element: <RecetteSearch /> },
    { path: "/restaurant", element: <RestaurantSearch /> },
    { path: "/communaute", element: <CommunauteSearch /> },
    { path: "/partage", element: <PartageSearch /> },

    // Onglets personnels principaux
    { path: "/favoris", element: <Favoris /> },
    { path: "/messages", element: <MessageHome /> },
    { path: "/profil", element: <Profil /> },

    // ==================== SOUS-PAGES ========================

    // Pages d'information (contenu individuel)
    { path: "/recette/:id", element: <RecettePage /> },
    { path: "/restaurant/:id", element: <RestaurantPage /> },
    { path: "/postCommunaute/:id", element: <CommunautePage /> },
    { path: "/partage/:id", element: <PartagePage /> },

    // Pages de création
    { path: "/createRecette", element: <RecetteCreation /> },
    { path: "/createCommunaute", element: <CommunauteCreation /> },
    { path: "/createPartage", element: <PartageCreation /> },

    // TODO : Pages de commentaires (à ajouter plus tard)
    // { path: "/recette/:id/commentaires", element: <RecetteCommentaires /> },
    // { path: "/restaurant/:id/commentaires", element: <RestaurantCommentaires /> },

    // Pages de messages
    { path: "/messages/:id", element: <Message/> },

    // Pages de profil
    { path: "/profil/:pseudo", element: <Profil /> },
    { path: "/inscription", element: <Inscription /> },
    { path: "/modificationMotDePasse", element: <PasswordModification /> },
    { path: "/connexion", element: <Connexion /> },
];


function App() {
  return (
      <div className="App">
          <MenuBar/>
        <div className="container">
            <ScrollToTop />
            <Routes>

                {routes.map((route) => (
                    <Route path={ route.path } element={ route.element }/>
                ))}

            </Routes>
        </div>
      </div>
  );
}

export default App;
