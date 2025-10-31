import GenericSearchPage from "./GenericSearchPageV2";

import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import React from "react";

export default function RecetteSearchPage({resNumber, onFilterClick, onSearchClick, children}){

    const [pageDescription, setPageDescription] = React.useState({
        title : "Recettes",
        description : "Trouve ou découvre des recettes adaptées à tes envies et besoin ! ",
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
            resNumber={resNumber}
            onFilterClick={onFilterClick}
            onSearchClick={onSearchClick}
        >
            {children}
        </GenericSearchPage>
    );
}