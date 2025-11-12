import * as React from 'react';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

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
    IconButton, Avatar
} from '@mui/material';

// Importation pour les Icons
import MenuIcon from '@mui/icons-material/Menu';
import iconHappyFoody from "./HappyFoodyIcon.png";

// Icons et badge
import MessagesIcon from "@mui/icons-material/EmailOutlined";
import FavorisIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PartagesIcon from "@mui/icons-material/VolunteerActivismOutlined";
import CommunauteIcon from "@mui/icons-material/PeopleOutlined";
import RestaurantsIcon from "@mui/icons-material/RestaurantOutlined";
import RecettesIcon from "@mui/icons-material/MenuBookOutlined";
import Badge from "@mui/material/Badge";
import {ColorAvatar} from "../ColorAvatar";

export default function MenuBar() {

    const location = useLocation();
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const isConnected = !!localStorage.getItem('token');
    const profilPath = isConnected ? "/profil" : "/connexion";
    const userImageUrl= localStorage.getItem('urlImage');
    const username= localStorage.getItem('pseudo'); // TODO : A verifier

    const leftButtons = [
        { path:"/recette",    text: 'Recette',    icon: <RecettesIcon /> },
        { path:"/restaurant", text: 'Restaurant', icon: <RestaurantsIcon /> },
        { path:"/communaute", text: 'Communauté', icon: <CommunauteIcon /> },
        { path:"/partage",    text: 'Partage',    icon: <PartagesIcon /> },
    ];

    const rightButtons = [
        { path:"/favoris",  icon: <FavorisIcon />,  badge: 0 },
        { path:"/messages", icon: <MessagesIcon />, badge: 0 },
        {
            path: profilPath,
            icon: (
                <ColorAvatar
                    src={isConnected ? userImageUrl : null}
                    name={isConnected ? username : null}
                />
            ),
            badge: 0
        },
    ];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar component='nav' position='sticky'>
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
                                onClick={handleCloseNavMenu}
                                component={Link}
                                to={button.path}

                                sx={{
                                    color: location.pathname.startsWith(button.path) ? 'white' : 'primary',
                                    backgroundColor: location.pathname.startsWith(button.path) ? 'orange' : 'white',
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
                                <MenuItem onClick={handleCloseNavMenu}
                                          component={Link}
                                          to={button.path}
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
                            <IconButton onClick={handleCloseNavMenu}
                                        component={Link}
                                        to={button.path}
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