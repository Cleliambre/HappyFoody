import React from "react";

import {
    Stack,
    Button,
    Card,
    CardHeader,
    TextField,
    Typography, CardContent, Box, Rating, Grid,
} from "@mui/material";


import {ColorAvatar} from "../ColorAvatar";
import ConfianceIcon from "@mui/icons-material/ThumbUpOutlined";
import RadioGroupRating from "../smiley_rating/RadioGroupRating";

function CreationCommElement({typeCommentaire, setLabel}) {

    // TODO prendre la note et l'ajouter à onPublier
    const [value, setValue] = React.useState(null);

    // Element vide
    if (typeCommentaire === "communaute" || typeCommentaire === "partage") {
        return null;
    }

    // Element de recette
    if (typeCommentaire === "recette") {
        return (
            <Box sx={{ display: 'flex', flexDirection:'row', alignItems: 'center' }}>
                <Rating
                    value={value}
                    precision={0.5}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
                {value === null && (
                    <Typography color="gray" sx={{ml: 2}}>Sans Note</Typography>
                )}
            </Box>
        );
    }

    // Element de restaurant
    if (typeCommentaire === "restaurant") {
        setLabel("Avis");

        // TODO à compléter
        const notes = [
            {critere: "Rapidité", note: null},
            {critere: "Qualité",  note: null},
            {critere: "Service",  note: null},
            {critere: "Hygiène",  note: null}
        ];

        return (
            <Grid container spacing={5}
                  sx={{
                      justifyContent: "space-around",
                      alignItems: "center"
                  }}
            >
                {notes.map((note) => (
                    <Stack container flexDriection="column" spacing={1}
                          sx={{
                              justifyContent: "space-around",
                              alignItems: "center"
                          }}>
                        <Typography>{note.critere}</Typography>
                        <RadioGroupRating/>
                    </Stack>
                ))}
            </Grid>
        );
    }

    // Pas de typeCommentaire valide
    return (
        <Typography color="error">
            Erreur de typeCommentaire
        </Typography>
    );
}

export default function CreationComm({
        typeCommentaire = "communaute",
        currentProfil = null,
        repondA = null,
        onPublier,
        onCancel
    }) {

    const [label, setLabel] = React.useState("Commentaire");

    const [commentaire, setCommentaire] = React.useState("");

    const handleValidationComment = () => {
        if (currentProfil) {
            onPublier({
                idCommRepondu: repondA?.idCommentaire ?? 0,
                contenu: commentaire,

                // idAuteur
                username: currentProfil.username,
                userImageUrl: currentProfil.userImageUrl,
            });
            onCancel();
            setCommentaire("");
        }
    }

    const handleAnnulerComment = () => {
        setCommentaire("");
    }

    return (
        <Card sx={{padding: '10px', flexGrow: 1}} elevation={5}>
            <CardHeader
                avatar={
                    currentProfil && (
                        <ColorAvatar
                            src={currentProfil.userImageUrl}
                            name={currentProfil.username}
                        />
                    )
                }
                title={currentProfil && (
                        <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                {currentProfil.username}
                            </Typography>
                            { typeCommentaire === "partage" &&
                            <Box sx={{display: "flex", flexDirection: "row", gap: 0.5}}>
                                {Array.from({length: currentProfil.scoreConfiance}).map(() => (
                                    <ConfianceIcon fontSize="small"/>
                                ))}
                            </Box>
                            }
                        </Box>
                    )}
            />

            <CardContent>
                <Stack direction="column" spacing={2} alignItems="flex-start">

                    {repondA && currentProfil && (
                        <Box
                            sx={{
                                mb: 2,
                                p: 1,
                                borderLeft: "3px solid",
                                borderColor: "primary.main",
                                backgroundColor: "action.hover"
                            }}
                        >
                            <Typography sx={{whiteSpace: 'pre-line'}}>
                                <Box component="span" fontWeight="bold">
                                    Répondre à @{repondA.username}
                                </Box>
                                {"\n"}{repondA.contenu}
                            </Typography>

                            <Button
                                size="small"
                                color="error"
                                onClick={onCancel}
                                sx={{mt: 1}}
                            >
                                Annuler la réponse
                            </Button>
                        </Box>
                    )}

                    <CreationCommElement typeCommentaire={typeCommentaire} setLabel={setLabel}/>

                    <TextField
                        multiline
                        fullWidth
                        label={label}
                        value={commentaire}
                        disabled={!currentProfil}
                        onChange={(e) => setCommentaire(e.target.value)}
                    />

                    {!currentProfil && (
                        <Typography color="error">
                            Connectez-vous pour envoyer des commentaires
                        </Typography>)
                    }

                    <Stack direction="row" spacing={2} width={"100%"} justifyContent="flex-end">
                        <Button onClick={handleAnnulerComment}>
                            Annuler
                        </Button>
                        <Button
                            onClick={handleValidationComment}
                            variant="contained"
                            disabled={!commentaire.trim()}
                        >
                            Publier
                        </Button>
                    </Stack>

                </Stack>
            </CardContent>

        </Card>
    );
}