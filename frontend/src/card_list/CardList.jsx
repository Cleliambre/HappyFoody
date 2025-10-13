import React, { useState } from 'react';
import { Stack, Container } from '@mui/material';

import img1 from '../images/berserk.jpg'
import img2 from '../images/enfer.jpg'
import img3 from "../images/necromencienne.jpg"

import GenericCard from "./GenericCard";
import PartageElement from "./PartageElement";
import PostElement from "./PostElement";
import RecetteAndRestoElement from "./RecetteAndRestoElement";

export default function CardList() {
    const [cards, setCards] = useState([
        {
            id: 1,
            title: 'Test-Recettes-Restaurants',
            text: <RecetteAndRestoElement
                rate={1.5}
                description="Un Deux Trois Quatre Cinq Six Sept Huit Neuf Dix Onze Douze Treize Quatorze Quinze !!!"
            />,
            tags: {},
            thumbnail: img1,
            liked: false,
            likes: 2,
        },
        {
            id: 2,
            title: 'Test-Post',
            text: <PostElement
                delai={2}
                unite="heure"
                description = "J'adore ma vie en enfer lalalalala......T-T"
                nbCommentaire={5000}/>,
            tags: {},
            thumbnail: img2,
            liked: true,
            likes: 1000000,
        },
        {
            id: 3,
            title: 'Test-Partage',
            text: <PartageElement
                pseudo="necroDansLAme"
                confiance={3}
                description = "Vie fantomatique à partager, merci de me dm."/>,
            tags: {},
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
        <Container>
            <h2>{heading}</h2>
            <Stack spacing={2}>
                {cards.map((card) => (
                    <GenericCard
                        key={card.id}
                        card={card}
                        onLike={handleLike}
                        onClick={handleClick}
                    />
                ))}
            </Stack>
        </Container>
    );
}