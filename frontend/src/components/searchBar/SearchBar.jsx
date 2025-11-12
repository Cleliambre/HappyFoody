import React, {useState} from 'react';
import './SearchBar.css'
import {IconButton, InputBase, Paper} from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

export default function SearchBar({message, color, onFilterClick, onSearchClick}) {
    const [inputValue, setInputValue] = useState("");

    const handleSearch = () => {
        if (onSearchClick) {
            onSearchClick(inputValue.trim()); //transmet la valeur saisie
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); //permet de lancer la recherche avec Entrée
        }
    };

    return(
        <Paper
            className="searchBar"
            elevation={1}
            sx={{backgroundColor: color}}
        >
            <IconButton
                onClick={onFilterClick}
            >
                <FilterAltOutlinedIcon />
            </IconButton>
            <InputBase
                fullWidth={true}
                placeholder={message}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <IconButton
                onClick={handleSearch}
            >
                <SearchOutlinedIcon/>
            </IconButton>
        </Paper>
    );
}