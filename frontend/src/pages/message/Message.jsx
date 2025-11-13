import Stack from "@mui/material/Stack";
import {Box,Divider, IconButton, InputBase, Paper, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import necromencienne from "../../images/necromencienne.jpg"
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MessageDisplay from "../../components/card_list/MessageDisplay";
import berserker from "../../images/berserker.jpeg"
import {useNavigate} from "react-router-dom";
import ColorAvatar from "../../components/ColorAvatar";

export default function Message() {
    useEffect(() => {
        const timer = setTimeout(() => {
        }, 0);
    }, []);

    const [destinataire, setDestinataire] = useState({
        id : 2,
        pp : necromencienne,
        pseudo : "fanDeSalade"
    });

    const [user, setUser] = useState({
        id : 4,
        pp : berserker,
        pseudo : "MariaSalade"
    });

    const [messages, setMessages] = useState([
        {
            id: 1,
            contenu : "Bonjour !",
            idAuteur : 2,
            dateEnvoi : new Date(2025, 10, 9, 10, 30),
        },
        {
            id: 2,
            contenu : "Je trouve votre recette de salade excellente, vous auriez des astuces à me donner ? Comme comment essorer la salade efficacement ?",
            idAuteur : 2,
            dateEnvoi : new Date(2025, 10, 9, 10, 31),
        }
    ]);

    const [nouveauMessage, setNouveauMessage] = useState("");

    const handleMessageChange = (newMessage) => {
        setNouveauMessage(newMessage);
    }

    const handleSend = () => {
        if(nouveauMessage!=="")
        {
            const newMessage = {
            id : messages.length+1,
            contenu : nouveauMessage,
            idAuteur : user.id,
            dateEnvoi : new Date()
            }
            setMessages([...messages, newMessage]);
            setNouveauMessage("")
        }
    }

    /*Pour être automatiquement au dernier message*/
    const messagesEndRef = React.useRef(null);

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const navigate = useNavigate();

    return (
        <Stack
            height={"100%"}
            direction="column"
            spacing={2}
            alignItems="center"
            justifyContent={"center"}
        >
            <Paper
                elevation={3}
                sx={{
                    width: "80%",
                    height: "80%",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                {/*header*/}
                <Stack
                    direction="row"
                    spacing={2}
                    width="100%"
                    alignItems="center"
                    justifyContent={"space-between"}
                    padding={2}
                    boxSizing={"border-box"} //pour que le contenu ne dépasse pas
                >
                    <Stack direction="row" spacing={2} alignItems="center">
                        <ColorAvatar src={destinataire.pp} name={destinataire.pseudo}/>
                        <Typography variant="h3">
                            {destinataire.pseudo}
                        </Typography>
                    </Stack>

                    <IconButton>
                        <CloseOutlinedIcon onClick={() => navigate("/messages")}/>
                    </IconButton>
                </Stack>
                <Divider flexItem={true} sx={{ borderBottomWidth: 1 }}/>

                {/*Contenu des messages*/}
                <Box
                    sx={{
                        flexGrow: 1, // prend toute la place disponible
                        overflowY: "auto", // active le scroll vertical
                        p: 2,
                        backgroundColor: "lightskyblue",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2, // espacement entre les messages
                    }}
                >
                    {messages.map((message, index) => (
                        <MessageDisplay
                            avatar={message.idAuteur === destinataire.id ? destinataire.pp : user.pp}
                            content={message.contenu}
                            date = {message.dateEnvoi}
                            isUser={message.idAuteur === user.id }
                        />
                    ))}
                    <div ref={messagesEndRef} />
                </Box>

                {/*Ajout d'un nouveau message*/}
                <Divider flexItem={true} />
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent={"center"}
                    height={"30%"}
                    padding={1}
                >
                    <Paper
                        elevation={1}
                        sx={{display: "flex",
                            flexDirection:"row",
                            width: "80%",
                            padding : 2
                        }}
                    >
                        <InputBase
                            fullWidth={true}
                            placeholder={"Entrez votre message..."}
                            multiline={true}
                            value={nouveauMessage}
                            sx={{
                                maxHeight: "4.5em", // environ 3 lignes max
                                overflowY: "auto", // fait défiler si le texte dépasse
                                p: 1,
                            }}
                            onChange={(e)=>handleMessageChange(e.target.value)}
                        />
                        <IconButton onClick={handleSend}>
                            <SendOutlinedIcon/>
                        </IconButton>
                    </Paper>
                </Stack>

            </Paper>
        </Stack>
    );
}