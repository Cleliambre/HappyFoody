import GenericSearchPage from "./GenericSearchPage";

import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import {Chip} from "@mui/material";
import React from "react";

export default function RecetteSearchPage({onFilterClick, onSearchClick, children}){

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
            onFilterClick={onFilterClick}
            onSearchClick={onSearchClick}
        >
            {children}
        </GenericSearchPage>
    );
}