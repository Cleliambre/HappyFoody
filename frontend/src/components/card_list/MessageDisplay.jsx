import {Card, CardActions, CardContent, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import React from "react";
import ColorAvatar from "../ColorAvatar";

export default function MessageDisplay({avatar, pseudo="", content, date, isUser}){
    const formatDate = () => {
        let year = date.getFullYear();
        let month = date.getMonth(); //0 : Janvier
        let dayDate = date.getDate(); //jour du mois
        let day = date.getDay(); //0 : dimanche ; jour de la semaine
        let hour = date.getHours();
        let minute = date.getMinutes();
        let result = "";
        let rempli = false;

        const today = new Date();

        if(year!==today.getFullYear()){
            result = year+result;
            rempli=true;
        }
        if(rempli||month!==today.getMonth()){
            month+=1;
            if(rempli) result = "/" + result;
            result = month+result;
            if(month<10) result = "0"+result;
            rempli=true;
        }
        if(rempli||dayDate!==today.getDate()){
            if(rempli) {
                result = dayDate+"/"+result
                if(dayDate<10) result="0"+result;
            }
            else
            {
                switch(day)
                {
                    case 1:
                        result = "Lundi";
                        break;

                    case 2:
                        result = "Mardi";
                        break;

                    case 3:
                        result = "Mercredi";
                        break;

                    case 4:
                        result = "Jeudi";
                        break;

                    case 5:
                        result = "Vendredi";
                        break;

                    case 6:
                        result = "Samedi";
                        break;

                    case 0:
                        result = "Dimanche";
                        break;
                }
            }
            rempli=true;
        }
        if(!rempli){
            result += hour+":"+minute;
        }
        return result;
    }

    return (
        <Stack
            direction="row"
            justifyContent={isUser ? "flex-end" : "flex-start"} // 👈 alignement
            width="100%"

        >
            <Card
                sx={{width:'50%'}}
            >
                <CardContent>
                    <Stack direction="row" spacing={2} alignItems={"center"}>
                        <ColorAvatar src={avatar} name={pseudo}/>
                        <Typography variant="body2" sx={{whiteSpace: "pre-wrap"}}>
                            {content}
                        </Typography>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Typography
                        sx={{ ml: "auto"}}
                    >
                        {formatDate()}
                    </Typography>
                </CardActions>
            </Card>
        </Stack>
    );
}