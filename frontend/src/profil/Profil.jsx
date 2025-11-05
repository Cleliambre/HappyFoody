import React, {useEffect, useState} from 'react';
import './Profil.css'
import {Typography, Button, Avatar, Tab, Stack, Container} from '@mui/material';
import  {TabContext, TabList, TabPanel} from '@mui/lab'
import CardList from "../card_list/CardList";

export default function Profil({pp,pseudo, description, cards}) {
    const [value, setValue] = React.useState('1');
    const [compte, setCompte] = useState(null);

    useEffect(() => {
        const idCompte = localStorage.getItem('idCompte');
        if (!idCompte) {
            window.location.href = '/connexion';
            return;
        }

        fetch(`http://localhost:8080/api/compte/getCompteById/${idCompte}`)
            .then(res => res.json())
            .then(data => setCompte(data));
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('idCompte');
        window.location.href = '/connexion';
    };

    if (!compte) return <div>Chargement...</div>;

    return (
        <div className="profil-content">
            <Typography variant="h3" color="textSecondary">
                Profil
            </Typography>
            <Container sx={{width: '80%'}}>
                <div className="profil-description">
                    <Avatar src={compte.urlImage} className="profil-avatar" sx={{width:150, height:150}}/>
                    <div className="profil-description-text">
                        <Typography variant="h4" color="textPrimary">
                            {compte.pseudo}
                        </Typography>
                        <Typography variant="h5" color="textPrimary">
                            {compte.description}
                        </Typography>
                    </div>
                </div>

                <Stack
                    className="profil-buttons"
                    spacing={2}
                >
                    <Button variant="outlined" className = "modif">
                        Modifier le profil
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleLogout}>
                        Déconnexion
                    </Button>
                </Stack>
            </Container>

            <div className = "parutions">
                <TabContext
                    value={value}
                >
                    <TabList onChange={handleChange}>
                        <Tab value ="1" label="Mes recettes"/>
                        <Tab value ="2" label="Mes posts"/>
                        <Tab value = "3" label="Mes partages"/>
                    </TabList>
                    <TabPanel value="1" className="tab-content">
                        <CardList/>
                    </TabPanel>
                    <TabPanel value="2" className="tab-content">
                        Item Two
                    </TabPanel>
                    <TabPanel value="3" className="tab-content">
                        Item Three
                    </TabPanel>
                </TabContext>
            </div>
        </div>
    );

}