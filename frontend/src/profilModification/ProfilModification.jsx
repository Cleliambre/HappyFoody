import React from 'react';
import "./ProfilModification.css"
import {Typography, Avatar, Stack, TextField, Button, Badge, InputAdornment, IconButton} from "@mui/material";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

export default function ProfilModification({pseudo, pp, description, email, mdp}){
    return(
        <div className="profilModification-content">
            <Typography variant="h3" color="textSecondary" className = "titre">
                Modifier le profil
            </Typography>
            <Badge
                overlap="circular"
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                badgeContent=
                    {<IconButton>
                        <Avatar sx={{backgroundColor : "whiteSmoke",color : "black"}}>
                            <ModeEditOutlinedIcon/>
                        </Avatar>
                    </IconButton>}
            >
                <Avatar src={pp} className="profil-avatar" sx={{width:150, height:150}}/>
            </Badge>
            <Stack spacing={2} className="inputs"
            >
                <TextField
                    fullWidth
                    id="pseudo"
                    label="Pseudo"
                    variant="outlined"
                    defaultValue={pseudo}
                />
                <TextField
                    fullWidth
                    id="description"
                    label="Bio/description"
                    variant="outlined"
                    defaultValue={description}
                />
                <TextField
                    fullWidth
                    id="email"
                    label="Adresse mail"
                    variant="outlined"
                    defaultValue={email}
                />
                <TextField
                    fullWidth
                    disabled
                    id = "mdp"
                    type = "password"
                    label="Mot de passe"
                    variant="outlined"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <div>
                                        <Button
                                            variant="contained"
                                            sx ={{borderRadius:'30px'}}
                                        >
                                            Modifier
                                        </Button>
                                    </div>
                                </InputAdornment>
                            ),
                        },
                    }}
                    defaultValue={mdp}

                />

            </Stack>
            <Stack spacing={2} className="buttons">
                <Button
                    variant="contained"
                    color="primary"
                    size = "large"
                    sx ={{borderRadius:'30px'}}
                >
                    Enregistrer
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size = "large"
                    sx ={{borderRadius:'30px'}}
                >
                    Annuler
                </Button>
            </Stack>
        </div>
    );
}