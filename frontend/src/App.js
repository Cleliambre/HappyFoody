import './App.css';

import MenuBar from "./menu/MenuBar";

import Recette from "./pages/Recette"
import Restaurant from "./pages/Restaurant"
import Communaute from "./pages/Communaute"
import Partage from "./pages/Partage"

import Favoris from "./pages/Favoris"
import Messages from "./pages/Messages"
import Profil from "./pages/Profil"

import Inscription from "./Inscription/Inscription";

import { Routes, Route } from 'react-router-dom';

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

                <Route path="/favoris" element={<Favoris/>}/>
                <Route path="/messages" element={<Messages/>}/>
                <Route path="/profil" element={<Profil/>}/>
                  
                <Route path="/inscription" element={<Inscription/>} />
            </Routes>
        </div>
      </div>
  );
}

export default App;
