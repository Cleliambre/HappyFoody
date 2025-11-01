import GenericSearchPage from "./GenericSearchPageV2";
import React from "react";
import RestaurantOutlinedIcon from '@mui/icons-material/Restaurant';

/**
 * Version où les enfants représentent des cartes
 * @param onFilterClick
 * @param onSearchClick
 * @param children
 * @returns {React.JSX.Element}
 * @constructor
 */
export default function RestaurantSearchPage({onFilterClick, onSearchClick, children}){
    const [pageDescription, setPageDescription] = React.useState({
        title : "Restaurants",
        description : "Trouve ou découvre des restaurants proches de chez toi ! ",
        logo : <RestaurantOutlinedIcon sx={{ fontSize: "150px" }} />
    });

    const [barInfo, setBarInfo] = React.useState({
        barMessage : "Rechercher un restaurant",
        isPlus : false
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