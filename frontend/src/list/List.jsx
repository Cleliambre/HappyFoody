import * as React from 'react';

import "./List.css"

//build a List of Items
import List from '@mui/material/List';


/**
 *
 * @param imageURL le lien URL de l'image descriptive
 * @param title
 * @param type ne peut valoir que "Recette", "Restaurant", "Post" ou "Partage"
 * @param isFavorite dit si l'utilisateur l'a enregistré en favori
 * @param description
 * @param tags la liste des tags associés à la carte. Chaque élément est structuré comme tel : {id, nom}
 * @param rate note donnée si c'est une Recette ou un Restaurant (peut valoir entre 0 et 5)
 * @param confiance note donnée à l'auteur si c'est un Partage
 * @constructor
 */

export default function CardList({cards}) {
    //cards est une liste de "cartes" dont chaque élément est structuré comme tel : {id, element} ou element représente une balise de carte
    return(
        <List className="Liste">
            {cards.map(card =>
                <React.Fragment key={card.id}>
                    {card.element}
                </React.Fragment>
            )}
        </List>
    );
}

