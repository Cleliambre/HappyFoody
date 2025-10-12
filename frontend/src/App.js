import './App.css';
import CardList from "./list/List";
import {useState} from "react";
import PartageCard from "./card/PartageCard";

import berserk from './images/berserk.jpg'
import enfer from './images/enfer.jpg'
import necromencienne from "./images/necromencienne.jpg"
import PostCard from "./card/PostCard";
import RecetteAndRestoCard from "./card/RecetteAndRestoCard";

function App() {
    const [cards, setCards] = useState([
        {id:0,
        element : <RecetteAndRestoCard
            imageURL = {berserk}
            title = "Test"
            description = "Ceci est un test"
            isFavorite={true}
            nbFavori={50000}
            tags = {[]}>
        ></RecetteAndRestoCard>},
        {id:1,
        element: <RecetteAndRestoCard
            imageURL = "https://i.imgur.com/MK3eW3As.jpg"
            title = "Test2"
            description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
            tags = {[]}>
        ></RecetteAndRestoCard>},
        {id:2,
        element: <PostCard
            imageURL = {enfer}
            title = "TestPost"
            description = "j'adore ma vie en enfer lalalalala......T-T"
            isFavorite={true}
            nbFavori={1000}
            nbCommentaire={5000}
            delai={1}
            unite="heure"
            >
            </PostCard>},
        {id:3,
        element: <PartageCard
            imageURL = {necromencienne}
            title = "TestPartage"
            description = "Vie fantomatique à partager, merci de me dm..."
            isFavorite={false}
            nbFavori={100000}
            pseudo="necroDansLAme"
            confiance={6}
        >
        </PartageCard>}
    ])


  return (
    <div className="App">
      <header className="App-header">
          <CardList cards = {cards}>
          </CardList>
      </header>
    </div>
  );
}

export default App;
