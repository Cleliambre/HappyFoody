import {Stack, Card, CardMedia, Typography, Divider, Avatar, Chip, CardContent, IconButton, TextField, CardActions, Collapse, Badge} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddIcon from '@mui/icons-material/Add';

export default function CreateCardDescription({image, tags, titre, texteDescription, compte, texteTitreField, onTagAdd, onTagDelete, onTitleChange, onDescriptionChange, children}){

    const [isExpanded, setExpanded] = React.useState(false);

    const handleExpandMore = () => {setExpanded(!isExpanded);};

    return (
        /*Boîte de description*/
        <Card
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CardContent
                sx={{width:'95%', display:"flex", justifyContent:"space-between"}}
            >
                <Stack direction={"column"} spacing={2} width={"100%"}>
                    {/*contenu de la description*/}
                    <Stack
                        direction="row"
                        spacing={4}
                        alignItems="start"
                        width="100%"
                    >
                        {/*Stack pour pouvoir espacer le stylo avec le reste*/}
                        <Stack paddingBottom={2}>
                        {/*image*/}
                            <Badge
                                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                className="badge"
                                badgeContent=
                                    {<IconButton>
                                        <Avatar sx={{backgroundColor : "whiteSmoke",color : "black"}}>
                                            <ModeEditOutlinedIcon/>
                                        </Avatar>
                                    </IconButton>}
                            >
                                <CardMedia
                                    component="img"
                                    image={image}
                                    sx={{width:"200px", height:"200px"}}
                                />
                            </Badge>
                        </Stack>

                        {/*titre, auteur, description et tags*/}
                        <Stack
                            direction="column"
                            minHeight={"200px"}
                            justifyContent="space-between"
                            width="100%"
                        >
                            {/*titre, auteur, description*/}
                            <Stack
                                direction="column"
                                spacing={2}
                                alignItems="start"
                            >
                                {/*titre*/}
                                <TextField
                                    value={titre}
                                    label={texteTitreField}
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={(e)=>onTitleChange(e.target.value)}
                                />

                                {/*auteur + divider*/}
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                >
                                    <Divider
                                        orientation="vertical"
                                        flexItem
                                    />
                                    {/*auteur*/}
                                    <Avatar
                                        src={compte.pp}
                                    />
                                    <Typography variant="body2">
                                        {compte.pseudo}
                                    </Typography>
                                </Stack>
                                {/*Description*/}
                                <TextField
                                    multiline={true}
                                    value={texteDescription}
                                    fullWidth={true}
                                    label="description"
                                    variant="outlined"
                                    onChange={(e)=>onDescriptionChange(e.target.value)}
                                />
                            </Stack>
                        </Stack>

                    </Stack>
                    {/*Children (zones d'input supplémentaires)*/}
                    <Stack direction="row" gap={2} justifyContent="space-between">
                        {children}
                    </Stack>
                </Stack>
            </CardContent>

            <Divider/>
            <CardActions sx={{justifyContent:"space-between"}}>
                <Typography variant="h6" color="textSecondary">
                    Catégories
                </Typography>
                <IconButton onClick={handleExpandMore}>
                    <ExpandMoreIcon/>
                </IconButton>
            </CardActions>

            {/*tags*/}
            <Collapse in={isExpanded}>
                <Stack direction="row" flexWrap="wrap" gap={1} margin="10px">
                    {tags.map((tag, index) => (
                        <Chip
                            label={tag.label}
                            sx={{backgroundColor: tag.color}}
                            color={tag.color}
                            onDelete={()=>onTagDelete(index)}
                        />
                    ))}
                    <IconButton
                        color="primary"
                        sx={{borderColor: "black"}}
                        size="small"
                        onClick={()=>onTagAdd({label:"test", color:"success"})}
                    >
                        <AddIcon/>
                    </IconButton>
                </Stack>
            </Collapse>
        </Card>
    );
}