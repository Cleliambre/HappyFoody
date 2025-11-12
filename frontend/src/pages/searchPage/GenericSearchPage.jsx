import React from "react";
import "./SearchPage.css"
import Stack from "@mui/material/Stack";
import {Typography, Button, Pagination, Chip, Box} from "@mui/material";
import SearchBar from "../../components/searchBar/SearchBar";
import AddIcon from '@mui/icons-material/Add';
import CardListV2 from "../../components/card_list/CardList";

/**
 * Version où les enfants représentent des cartes
 * @param pageDescr de la forme {balise simple logo, string title, string description}
 * @param tags
 * @param barInfo de la forme {string barMessage, bool isPlus}
 * @param onFilterClick pour la gestion d'évènement pour un clic sur le bouton de filtre
 * @param onSearchClick pour la gestion d'évènement pour un clic sur le bouton de recherche
 * @param onTagDelete pour la gestion de suppression de tags
 * @param onPlusClick pour la gestion d'évènement pour un clic sur le bouton de création
 * @param paginationSize un entier donnant le nombre de pages pour la pagination
 * @param children
 * @param resultCount
 * @param page
 * @param onPageChange
 * @returns {React.JSX.Element}
 * @constructor
 */
export default function GenericSearchPage({pageDescr, tags, barInfo, onFilterClick, onSearchClick, onTagDelete, onPlusClick, paginationSize, children, resultCount,page, onPageChange}) {
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
                            onClick={onPlusClick}
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
                    {tags.map((desc) => (
                        <Chip
                            key={desc.name}
                            label={desc.name}
                            color={desc.color}
                            onDelete={() => onTagDelete(desc)}
                            sx={{ boxShadow: 2 }}
                        />))}
                </Stack>
            </Stack>
            <CardListV2
                resMessage = {resultCount + (resultCount>1 ? " Resultats" : " Resultat")}
            >
                {children}
            </CardListV2>
            <Pagination
                count={paginationSize}
                page={page}
                onChange={onPageChange}
            />
            <Box sx={{ height: '15px' }} />
        </Stack>
    );
}