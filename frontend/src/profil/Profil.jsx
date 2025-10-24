import React from 'react';
import './Profil.css'
import {Typography, TextField, Button, Avatar, Tabs, Tab} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CardList from "../card_list/CardList";

export default function Profil({pp,pseudo, description}) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="profil-content">
            <Typography variant="h3" color="textSecondary" className = "titre">
                Profil
            </Typography>
            <div>
                <div className="profil-description">
                    <Avatar src={pp} className="profil-avatar" sx={{width:150, height:150}}/>
                    <div className="profil-description-text">
                        <Typography variant="h4" color="textPrimary">
                            {pseudo}
                        </Typography>
                        <Typography variant="h5" color="textPrimary">
                            {description}
                        </Typography>
                    </div>
                </div>

                <div className="profil-buttons">
                    <div className="button-container">
                        <Button variant="outlined" className = "modif">
                            Modifier le profil
                        </Button>
                    </div>
                    <Button variant="outlined" color="error">
                        Déconnexion
                    </Button>
                </div>
            </div>

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