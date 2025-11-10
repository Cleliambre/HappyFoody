import CreateCardDescription from "./CreateCardDescription";
import React, {useState} from "react";

import berserker from "../../images/berserker.jpeg"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import {Dialog, DialogContent, DialogContentText, DialogTitle, MenuItem, Paper, Select, TextField, Typography, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function PartageCreation(){

    const[image, setImage] = useState(null);

    const [tags, setTags] = useState([]);

    const [titre, setTitre] = useState("");

    const [description, setDescription] = useState("");

    const [compte, setCompte] = useState(
        {pp : berserker, pseudo : "MariaSalade"}
    );

    const [parts, setParts] = useState();

    const [typesProposition, setTypes] = useState([
        "Don",
        "Partage"
    ])

    const [selectType, setSelectType] = useState("");

    const [lieuRencontre, setLieuRencontre] = useState("");

    //pour le sélecteur de date
    const [value, setValue] = useState(dayjs());

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

    const [opened3, setOpened3] = useState(false);

    const handleOpen3 = () => {setOpened3(true);};
    const handleClose3 = () => {setOpened3(false);};

    const [tagsPossibles, setTagsPossibles] = useState([
        {label: "vegetarien", color : "success"}
    ])

    const [tagSelected, setTagSelected] = useState("vegetarien");

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
                    <VolunteerActivismOutlinedIcon sx={{ fontSize: "150px" }}/>

                    <Stack direction="column" spacing={2} textAlign="center">
                        <Typography variant="h3">
                            Création d'une page de partage
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
                        texteTitreField="Nom de la page de partage"
                        image={image}
                        tags={tags}
                        titre={titre}
                        texteDescription={description}
                        compte={compte}
                        onTagAdd={handleOpen3}
                        onTitleChange={handleTitle}
                        onDescriptionChange={handleDescription}
                        onTagDelete={handleTagRemove}
                    >
                        <Select
                            variant="standard"
                            label="Type de proposition"
                            onChange={(e)=>setSelectType(e.target.value)}
                            value = {selectType}
                        >
                            {typesProposition.map(type =>
                                <MenuItem
                                    value={type}
                                    key={type}
                                >
                                    {type}
                                </MenuItem>
                            )}
                        </Select>

                        <TextField
                            label="Lieu de rencontre"
                            value={lieuRencontre}
                            onChange={(e)=>setLieuRencontre(e.target.value)}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Choisir une date"
                                value={value}
                                onChange={(newValue) => setValue(newValue)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                    </CreateCardDescription>
                </Stack>

                {/*Description détaillée*/}

                {/*nombre de parts*/}
                <Paper elevation={2} sx={{padding:2, alignContent:"center"}}>
                    <Stack direction="column" spacing={2} alignItems="center">
                        <Typography variant="h5">
                            Nombre parts/personnes :
                        </Typography>

                        <TextField
                            type="number"
                            variant="outlined"
                            value={parts}
                            sx={{width:75}}
                            onChange={(e)=>setParts(Number(e.target.value))}
                        />
                    </Stack>
                </Paper>

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
            <Dialog open={opened3} onClose={handleClose3}>
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
                                handleClose3();
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