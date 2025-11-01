import './App.css';
import React, {useState} from "react";
import RestaurantSearchPage from "./searchPage/RestaurantSearchPageV2";
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import img1 from "./images/enfer.jpg"
import {Chip, Stack} from "@mui/material";
import RecetteAndRestoElement from "./card_list/RecetteAndRestoElement";
import img0 from "./images/taboule.png";
import PostElement from "./card_list/PostElement";
import img2 from "./images/taboule_crame.png";
import PartageElement from "./card_list/PartageElement";
import img3 from "./images/poulet.jpg";
import GenericCard from "./card_list/GenericCard";
import CommunauteSearchPage from "./searchPage/CommunautéSearchPageV2";
import PartageSearchPage from "./searchPage/PartageSearchPageV2";
import RecetteSearchPage from "./searchPage/RecetteSearchPageV2";

function App() {

    const handleTag = (deletingDesc)=> {
        const newTagsDesc = tagsDesc.filter((description) => description.name !== deletingDesc.name);
        setTagsDesc(newTagsDesc);
    }

    const [tagsDesc, setTagsDesc] = React.useState([
        {
            name: "Végétarien",
            color: "success"
        },
        {
            name:"test"
        }
    ]);

    const [cards, setCards] = useState([
        {
            id: 0,
            title: 'Taboulé (Test Recette)',
            text: <RecetteAndRestoElement
                rate={3.5}
                description="Un très bon taboulé, très frais et aérien."
                tags_nourriture={["Végétarien"]}
            />,
            tags: [],
            thumbnail: img0,
            liked: false,
            likes: 119,
        },
        {
            id: 1,
            title: 'Wok Sushi (Test Restaurant)',
            text: <RecetteAndRestoElement
                rate={4.0}
                description="Le restaurant Wok & Sushi fusionne deux spécialités asiatiques.
                    WOK exprime les plats chauds du traiteur asiatique comme les Bobuns,
                    les nouilles sautés, les gambas et bien d'autre encore..
                    SUSHI vous fera découvrir le restaurant japonais avec certaines saveurs telles que des sushis,
                    des makis california, des sashimis et plus d'autre encore."
                tags_lieu={["Les Ulis, 91940"]}
                tags_nourriture={["Asiatique", "Wok", "Sushi"]}
            />,
            tags: [],
            thumbnail: img1,
            liked: false,
            likes: 97,
        },
        {
            id: 2,
            title: 'Aide Taboulé cramé (Test Post)',
            text: <PostElement
                delai={8}
                unite="heure"
                description = "Bonjour, je viens de cramer du taboulé.
                    Vous pensez que je peux encore le manger ?
                    J’aime pas mangé froid du coup je l’ai un peu chauffé..."
                nbCommentaire={15000}
            />,
            thumbnail: img2,
            liked: true,
            likes: 1000000,
        },
        {
            id: 3,
            title: 'Poulet rôti (Test Partage)',
            text: <PartageElement
                pseudo="necroDansLAme"
                confiance={3}
                description = "Vie fantomatique à partager, merci de me dm."
                tags_partage={ ["Partage",
                    <div style={{ textAlign: 'center', lineHeight: 1.0 }}>
                        <div>Publié le</div>
                        <div>16/09/2025</div>
                    </div>,
                    <div style={{ textAlign: 'center', lineHeight: 1.0 }}>
                        <div>Expire le</div>
                        <div>20/09/2025</div>
                    </div>]}
                tags_lieu={["Polytech Paris-Saclay, Orsay", "Gif-sur-Yvette", "Palaiseau", "Massy"]}
                tags_nourriture={["Chaud", "Salé", "Poulet", "Au four", "Herbe", "Viande"]}
            />,
            thumbnail: img3,
            liked: false,
            likes: 15400,
        },
    ]);

    const handleLike = (card) => {
        setCards((prev) =>
            prev.map((c) =>
                c.id === card.id
                    ? {
                        ...c,
                        liked: !c.liked,
                        likes: c.liked ? c.likes - 1 : c.likes + 1,
                    }
                    : c
            )
        );
    };

    const handleClick = (card) => {
        alert(`Carte sélectionnée : ${card.title}`);
    };

    {/* Pour l'affichage du nombre de résultat */}
    const count = cards.length;
    let heading = "";
    if (count > 0) {
        const noun = count > 1 ? 'Résultats' : 'Résultat';
        heading = count + ' ' + noun;
    }


  return (
    <div className="App">
      <RecetteSearchPage
          resNumber={cards.length}
      >
              {cards.map((card) => (
                  <GenericCard
                      key={card.id}
                      card={card}
                      onLike={handleLike}
                      onClick={handleClick}
                  />
              ))}
      </RecetteSearchPage>
    </div>
  );
}

export default App;
