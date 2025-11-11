import React from "react"
import {Card, CardActionArea, CardContent, CardHeader, IconButton, Tooltip, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';

export default function({avatar, pseudo, lastMessage, muet, lu, date, onClick, onNotif}) {
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

    const formatLu = ()=>{
        if(!lu)
        {
            if(muet)
            {
                return <React.Fragment/>;
            }
            else return <MarkChatUnreadOutlinedIcon color={"primary"}/>
        }
        return <React.Fragment/>
    }

    return (
        <Card onClick={onClick?onClick:()=>{}}>
            <CardActionArea>
                <CardHeader
                    avatar={avatar}
                    title={pseudo}
                    action={
                        <Stack direction="row" spacing={1} alignItems="center">
                            {formatLu()}
                            <Stack onClick={(e) => e.stopPropagation()}>
                                <IconButton onClick={onNotif?onNotif:null}>
                                    {muet ?
                                        <Tooltip title={"activer les notifications"}>
                                            <NotificationsActiveOutlinedIcon/>
                                        </Tooltip> :
                                        <Tooltip title={"désactiver les notifications"}>
                                            <NotificationsOffOutlinedIcon/>
                                        </Tooltip>}
                                </IconButton>
                            </Stack>
                        </Stack>
                    }
                />
                <CardContent>
                    {/*contenu de la carte*/}
                    <Stack
                        spacing={2}
                    >
                        <Typography
                            variant="body4"
                            color={lu?"black":"primary"}
                            sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"}}
                        >
                            {lastMessage}
                        </Typography>
                        <Stack direction="column" spacing={1} alignItems="end">
                            <Typography>
                                {formatDate()}
                            </Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}