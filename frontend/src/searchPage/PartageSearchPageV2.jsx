import GenericSearchPage from "./GenericSearchPageV2";
import React from "react";
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';

/**
 * Version où les enfants représentent des cartes
 * @param onFilterClick
 * @param onSearchClick
 * @param children
 * @returns {React.JSX.Element}
 * @constructor
 */
export default function CommunauteSearchPage({onFilterClick, onSearchClick, children}){
    const [pageDescription, setPageDescription] = React.useState({
        title : "Partage",
        description : "Trop de nourriture préparée ? Donne-la ou partage-la autour d'un bon repas avec d'autres personnes !",
        logo : <VolunteerActivismOutlinedIcon sx={{ fontSize: "150px" }} />
    });

    const [barInfo, setBarInfo] = React.useState({
        barMessage : "Rechercher un partage",
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