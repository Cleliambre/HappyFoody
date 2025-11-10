import * as React from 'react';
import { Link } from "react-router-dom";
import {Button, Typography} from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

export default function ButtonReturn({path, text}) {
    return(
        <Button
            variant="contained"
            sx={{backgroundColor: "gray", alignContent:'center', display:'flex', gap:'5px'}}
            component={Link}
            to={path}
        >
            <Typography>
                {text}
            </Typography>
            <KeyboardReturnIcon />
        </Button>
    );
}