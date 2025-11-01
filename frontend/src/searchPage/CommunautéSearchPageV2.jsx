import GenericSearchPage from "./GenericSearchPageV2";
import React from "react";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

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
        title : "Communauté",
        description : "Des questions ? Des astuces ? Des réussites ? Vous êtes au bon endroit !",
        logo : <PeopleAltOutlinedIcon sx={{ fontSize: "150px" }} />
    });

    const [barInfo, setBarInfo] = React.useState({
        barMessage : "Rechercher un forum",
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