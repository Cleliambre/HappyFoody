import React from "react";

import {
    Stack,
    Button,
    Card,
    CardHeader,
    TextField,
    Typography, CardContent, Box, Rating, Grid,
} from "@mui/material";

import ColorAvatar from "../ColorAvatar";
import ConfianceIcon from "@mui/icons-material/ThumbUpOutlined";
import RadioGroupRating from "../smiley_rating/RadioGroupRating";

function noteCompletee(typeCommentaire, noteRecette, notesRestaurant) {
    if (typeCommentaire === "recette") {
        return noteRecette !== null;
    }

    if (typeCommentaire === "restaurant") {
        return notesRestaurant.every(note => note.note != null);
    }
    return true;
}


function CreationCommElement(
    {typeCommentaire, setLabel,
        setNoteRecette, noteRecette,
        setNotesRestaurant, notesRestaurant
    })
{

    // Element vide
    if (typeCommentaire === "communaute" || typeCommentaire === "partage") {
        return null;
    }

    // Element de recette
    if (typeCommentaire === "recette") {
        return (
            <Box sx={{ display: 'flex', flexDirection:'row', alignItems: 'center' }}>
                <Rating
                    value={noteRecette}
                    precision={0.5}
                    onChange={(event, newValue) => {
                        setNoteRecette(newValue);
                    }}
                />
                {noteRecette === null && (
                    <Typography color="text.disabled" sx={{fontStyle: "italic", ml: 2}}>Sans Note</Typography>
                )}
            </Box>
        );
    }

    // Element de restaurant
    if (typeCommentaire === "restaurant") {
        setLabel("Avis");

        return (
            <Grid container spacing={5}
                  sx={{
                      justifyContent: "space-around",
                      alignItems: "center"
                  }}
            >
                {notesRestaurant.map((note) => (
                    <Stack container flexDriection="column" spacing={1}
                          sx={{
                              justifyContent: "space-around",
                              alignItems: "center"
                          }}>
                        <Typography>{note.critere}</Typography>
                        <RadioGroupRating
                            value={note.note}
                            onChange={(newValue) => {
                                setNotesRestaurant(prev =>
                                    prev.map(n =>
                                        n.critere === note.critere ? { ...n, note: newValue } : n
                                    )
                                );
                            }}
                        />
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
        onPublier = () => {},
        onCancel = () => {}
    }) {

    /* ================= Notes ================= */
    const [noteRecette, setNoteRecette] = React.useState(null);

    const [notesRestaurant, setNotesRestaurant] = React.useState([
        {critere: "Rapidité", note: null},
        {critere: "Qualité",  note: null},
        {critere: "Service",  note: null},
        {critere: "Hygiène",  note: null}
    ]);

    /* ================= Commentaire ================= */
    const [label, setLabel] = React.useState("Commentaire");

    const [commentaire, setCommentaire] = React.useState("");

    const handleValidationComment = () => {
        if (currentProfil) {

            let notes = {};

            if (typeCommentaire === "recette") {
                notes = {note: noteRecette};
            }

            if (typeCommentaire === "restaurant") {
                notes = {
                    noteRapidite: notesRestaurant[0].note,
                    noteQualite:  notesRestaurant[1].note,
                    noteService:  notesRestaurant[2].note,
                    noteHygiene:  notesRestaurant[3].note
                };
            }

            onPublier({
                idCommRepondu: repondA?.idCommentaire ?? 0,
                contenu: commentaire,
                ...notes,

                // idAuteur
                username: currentProfil.pseudo,
                userImageUrl: currentProfil.urlImage,
                scoreConfiance : currentProfil.scoreConfiance
            });
            onCancel();
            setCommentaire("");
            setNoteRecette(null);
            setNotesRestaurant(prev =>
                prev.map(n => ({ ...n, note: null }))
            );
        }
    }

    const handleAnnulerComment = () => {
        setCommentaire("");
    }

    return (
        <Card sx={{padding: '10px', width:'80%'}} elevation={5}>
            <CardHeader
                avatar={
                    currentProfil && (
                        <ColorAvatar
                            src={currentProfil.urlImage}
                            name={currentProfil.pseudo}
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

                    <CreationCommElement
                        typeCommentaire={typeCommentaire}
                        setLabel={setLabel}
                        setNoteRecette={setNoteRecette} noteRecette={noteRecette}
                        setNotesRestaurant={setNotesRestaurant} notesRestaurant={notesRestaurant}
                    />

                    <TextField
                        multiline
                        fullWidth
                        label={label}
                        value={commentaire}
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
                            disabled={
                                (!commentaire.trim() &&
                                !noteCompletee(typeCommentaire, noteRecette, notesRestaurant) )
                                || !currentProfil
                            }
                        >
                            Publier
                        </Button>
                    </Stack>

                </Stack>
            </CardContent>

        </Card>
    );
}