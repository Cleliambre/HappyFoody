import React from "react";
import "./SearchPage.css"
import Stack from "@mui/material/Stack";
import {Typography, Button, List, Box, Pagination, Chip, Container} from "@mui/material";
import SearchBar from "../searchBar/SearchBar";
import AddIcon from '@mui/icons-material/Add';
import CardListV2 from "../card_list/CardListV2";

/**
 * Version où les enfants représentent des cartes
 * @param pageDescr de la forme {balise simple logo, string title, string description}
 * @param barInfo de la forme {string barMessage, bool isPlus}
 * @param onFilterClick pour la gestion d'évènement pour un clic sur le bouton de filtre
 * @param onSearchClick pour la gestion d'évènement pour un clic sur le bouton de recherche
 * @param paginationSize un entier donnant le nombre de pages pour la pagination
 * @param children
 * @returns {React.JSX.Element}
 * @constructor
 */
export default function GenericSearchPage({pageDescr, barInfo, onFilterClick, onSearchClick, paginationSize, children}) {
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

    return (
        <Stack
            spacing={2}
            className="SearchPage"
            alignItems="center"
            padding={2}
        >
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
            >
                {pageDescr.logo}
                <Stack
                    direction="column"
                    spacing={2}
                    alignItems="center"
                    width={"80%"}
                >
                    <Typography variant="h3">
                        {pageDescr.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {pageDescr.description}
                    </Typography>
                </Stack>
            </Stack>

            <Stack
                direction="column"
                spacing={2}
                width={"100%"}
                alignItems="center"
                maxWidth={"1000px"}
            >
                <Stack direction="row" spacing={2} width={"100%"}>
                    <SearchBar
                        message={barInfo.barMessage}
                        onFilterClick={onFilterClick}
                        onSearchClick={onSearchClick}
                        className = "searchBar"
                    />
                    {barInfo.isPlus ?
                        <Button
                            variant="contained"
                        >
                            <AddIcon/>
                        </Button> : <React.Fragment/>}
                </Stack>
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems={"start"}
                    width={"100%"}
                >
                    {tagsDesc.map((desc) => (
                        <Chip
                            key={desc.name}
                            label={desc.name}
                            color={desc.color}
                            onDelete={() => handleTag(desc)}
                            sx={{ boxShadow: 2 }}
                        />))}
                </Stack>
            </Stack>
            <CardListV2
                resMessage = {React.Children.count(children) + (React.Children.count(children)>1 ? " Resultats" : " Resultat")}
            >
                {children}
            </CardListV2>
            <Pagination count={paginationSize}/>
        </Stack>
    );
}