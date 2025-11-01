import * as React from 'react';

// Importation pour to construire un MenuBar
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Menu,
    Container,
    Button,
    MenuItem,
    IconButton
} from '@mui/material';

// Importation pour les Icons
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import iconHappyFoody from "./HappyFoodyIcon.png";

import MessagesIcon from "@mui/icons-material/EmailOutlined";
import FavorisIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PartagesIcon from "@mui/icons-material/VolunteerActivismOutlined";
import CommunauteIcon from "@mui/icons-material/PeopleOutlined";
import RestaurantsIcon from "@mui/icons-material/RestaurantOutlined";
import RecettesIcon from "@mui/icons-material/MenuBookOutlined";
import Badge from "@mui/material/Badge";
import {useState} from "react";

// Noms et icons des boutons de gauche et droite du menu

const leftButtons = [
    { text: 'Recette',    icon: <RecettesIcon /> },
    { text: 'Restaurant', icon: <RestaurantsIcon /> },
    { text: 'Communauté',  icon: <CommunauteIcon /> },
    { text: 'Partage',    icon: <PartagesIcon /> },
];

const rightButtons = [
    { text: 'Favoris',  icon: <FavorisIcon />,  badge: 0 },
    { text: 'Messages', icon: <MessagesIcon />, badge: 0 },
    { text: 'Profil',   icon: <Avatar/>,        badge: 0 },
];

export default function MenuBar() {

    const [selectedButton, setSelectedButton] = useState("Recette");
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    {/*==== Version md ====*/}
                    <Avatar variant="rounded" src={iconHappyFoody}
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                width: 50, height: 50,
                                mr: 2
                            }}
                    />

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },
                        paddingBottom: '10px',
                        paddingTop: '10px'
                        }}
                    >
                        {leftButtons.map((button) => (
                            <Button
                                onClick={() => {handleCloseNavMenu(); setSelectedButton(button.text);}}
                                sx={{
                                    color: selectedButton === button.text ? 'white' : 'primary',
                                    backgroundColor: selectedButton === button.text ? 'orange' : 'white',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mr: 1,
                                    width: 120,
                                }}
                            >
                                {button.icon}
                                <span>{button.text}</span>
                            </Button>
                        ))}
                    </Box>

                    {/*==== Version xs ====*/}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' },
                        paddingBottom: '10px',
                        paddingTop: '10px'
                    }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            sx={{ mr: 1 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {leftButtons.map((button) => (
                                <MenuItem key={button.text}
                                          onClick={() => {handleCloseNavMenu(); setSelectedButton(button.text);}}
                                >
                                    {button.icon}
                                    <Typography sx={{ textAlign: 'center', paddingLeft:'5px' }}>{button.text}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                        <Avatar variant="rounded" src={iconHappyFoody}
                                sx={{
                                    display: { xs: 'flex', md: 'none' },
                                    width: 50, height: 50,
                                    mr: 1
                                }}
                        />
                    </Box>

                    {/*==== IconButtons de droite ====*/}
                    <Box sx={{ flexGrow: 0 }}>
                        {rightButtons.map((button) => (
                            <IconButton onClick={() => {handleCloseNavMenu(); setSelectedButton(button.text);}}
                                        sx={{ color: 'white', backgroundColor:'transparent',
                                            mr: 1,
                                            alignItems:'center'

                                        }}
                            >
                                <Badge badgeContent={button.badge} max={999}
                                           color="error">
                                        {button.icon}
                                </Badge>
                            </IconButton>
                        ))}
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}