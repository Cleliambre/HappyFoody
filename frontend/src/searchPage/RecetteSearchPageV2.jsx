import GenericSearchPage from "./GenericSearchPageV2";

import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import React from "react";

/**
 * Version où les enfants représentent des cartes
 * @param resNumber
 * @param onFilterClick
 * @param onSearchClick
 * @param children
 * @returns {React.JSX.Element}
 * @constructor
 */
export default function RecetteSearchPage({onFilterClick, onSearchClick, children}){

    const [pageDescription, setPageDescription] = React.useState({
        title : "Recettes",
        description : "Trouve ou découvre des recettes adaptées à tes envies et besoin ! \nTu peux aussi partager tes meilleures recettes !",
        logo : <AutoStoriesOutlinedIcon sx={{ fontSize: "150px" }} />
    });

    const [barInfo, setBarInfo] = React.useState({
        barMessage : "Rechercher une recette",
        isPlus : true
    });

    return (
        <GenericSearchPage
            pageDescr={pageDescription}
            barInfo={barInfo}
            paginationSize={30}
            onFilterClick={onFilterClick}
            onSearchClick={onSearchClick}
        >
            {children}
        </GenericSearchPage>
    );
}