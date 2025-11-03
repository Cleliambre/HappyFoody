import React from 'react';
import './SearchBar.css'
import {IconButton, InputBase, Paper} from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

export default function SearchBar({message, color, onFilterClick, onSearchClick}) {
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
            />
            <IconButton
                onClick={onSearchClick}
            >
                <SearchOutlinedIcon/>
            </IconButton>
        </Paper>
    );
}