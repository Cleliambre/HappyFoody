import {
    Dialog, DialogContent, DialogContentText, DialogTitle,MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import Button from "@mui/material/Button";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import CreateCardDescription from "./CreateCardDescription";
import React, {useState} from "react";
import berserker from "../../images/berserker.jpeg";

export default function CommunauteCreation(){
    const[image, setImage] = useState(null);

    const [tags, setTags] = useState([]);

    const [titre, setTitre] = useState("");

    const [description, setDescription] = useState("");

    const [compte, setCompte] = useState(
        {pp : berserker, pseudo : "MariaSalade"}
    );

    const handleTagAdd = (nom)=>{

        let error = false;
        tags.map(tag=>{
            if(tag.label === nom){
                error = true;
            }
        })
        if(!error)
        {
            const newTag = {label : nom, color : "success"};
            setTags([...tags, newTag]);
        }
    };

    const handleTagRemove = (index)=>{
        const newTags = tags.filter((description, index2) => index2 !== index);
        setTags(newTags);
    }

    const handleTitle = (titre) => setTitre(titre);

    const handleDescription = (description) => setDescription(description);


    const [opened, setOpened] = useState(false);

    const handleOpen = () => {setOpened(true);};
    const handleClose = () => {setOpened(false);};

    const [tagsPossibles, setTagsPossibles] = useState([
        {label: "vegetarien", color : "success"}
    ])

    const [tagSelected, setTagSelected] = useState(tagsPossibles.at(0).label);

    const [nouveauTagPossible, setNouveauTagPossible] = useState("");

    const [textErreurNouvTagPossible, setTextErreurNouvTagPossible] = useState("");
    const [colorTextError, setColorTextError] = useState("");

    const handleAjoutNouveauTagPossible = (nom)=>{
        let isError;
        isError = false
        if(nom===""){
            setTextErreurNouvTagPossible("Le nom entré est invalide ! ");
            setColorTextError("error");
            isError = true;
        }
        else {
            tagsPossibles.map(tag => {
                if (tag.label === nom || nom === "") {
                    setTextErreurNouvTagPossible("Le nom entré existe déjà ! ");
                    setColorTextError("error");
                    isError = true;
                }
            })
        }
        if(!isError){
            const newTag = {label : nom, color : "success"}
            setTagsPossibles([...tagsPossibles, newTag]);
            setTextErreurNouvTagPossible("Nom de tag ajouté !")
            setColorTextError("success");

            setTagSelected(nom);
            setNouveauTagPossible("");
        }

        isError = false;
    }

    return (
        <React.Fragment>
            {/*Contenu de la page*/}
            <Stack
                direction="column"
                spacing={2}
                alignItems="center"
                padding={2}
            >
                {/*Titre + bouton + carte de description*/}
                <Stack direction="row" spacing={2} alignItems="center">
                    <PeopleAltOutlinedIcon sx={{ fontSize: "150px" }}/>

                    <Stack direction="column" spacing={2} textAlign="center">
                        <Typography variant="h3">
                            Création d'une page de communauté
                        </Typography>
                    </Stack>
                </Stack>

                <Stack
                    alignItems="start"
                    width={"80%"}
                    maxWidth = "900px"
                    spacing={1}
                >
                    {/*Bouton de retour*/}
                    <Button
                        variant="contained"
                        sx={{backgroundColor: "gray", alignItems:"center"}}>
                        <Typography className = "cancel">
                            Retour
                        </Typography>
                        <KeyboardReturnIcon />
                    </Button>

                    {/*Carte de d'information*/}
                    <CreateCardDescription
                        texteTitreField="Titre de la page de communauté"
                        image={image}
                        tags={tags}
                        titre={titre}
                        texteDescription={description}
                        compte={compte}
                        onTagAdd={handleOpen}
                        onTitleChange={handleTitle}
                        onDescriptionChange={handleDescription}
                        onTagDelete={handleTagRemove}
                    />
                </Stack>

                {/*boutons annuler et valider*/}
                <Stack
                    direction="row"
                    spacing={2}
                >
                    <Button
                        variant="contained"
                        sx={{borderRadius:5, backgroundColor:"grey"}}
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="contained"
                        sx={{borderRadius:5}}
                    >
                        Confirmer
                    </Button>
                </Stack>

            </Stack>

            {/*Boîte de dialogue pour l'ajout d'un tag*/}
            <Dialog open={opened} onClose={handleClose}>
                <DialogTitle>
                    Ajout d'un tag
                </DialogTitle>
                <DialogContent>
                    <Stack direction="column" spacing={2}>
                        <DialogContentText>
                            Choisissez un tag à ajouter
                        </DialogContentText>
                        <Select
                            variant="standard"
                            fullWidth={true}
                            value={tagSelected}
                            onChange={(e)=>setTagSelected(e.target.value)}
                        >
                            {tagsPossibles.map((tag) =>
                                <MenuItem value={tag.label}>{tag.label}</MenuItem>
                            )}
                        </Select>
                        <DialogContentText>
                            Aucun tag ne vous convient ? Ajoutez-en un :
                        </DialogContentText>
                        <Stack direction="row" spacing={1}>
                            <TextField
                                label="nouveau tag"
                                value={nouveauTagPossible}
                                onChange={(e)=>setNouveauTagPossible(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                onClick={() => handleAjoutNouveauTagPossible(nouveauTagPossible)}
                            >
                                Ajouter
                            </Button>
                        </Stack>
                        <Typography color={colorTextError}>{textErreurNouvTagPossible}</Typography>
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleTagAdd(tagSelected);
                                handleClose();
                            }}
                        >
                            Confirmer
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>

        </React.Fragment>
    );
}