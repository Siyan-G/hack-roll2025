import React from "react";
import { AppBar, Container, Divider, Toolbar, Typography } from "@mui/material";
import Result from "./analysis-result/result";
import UploadContainer from "./input/uploadcontainer";


export default function UserContainer() {
    return (    
        <>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Video Summariser
                </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth={false} sx={{ bgcolor: "lightyellow", display: "flex", flexDirection: "row", height: "100vh" , width: "full"}}>
                <UploadContainer />
                <Divider orientation='vetical' variant='fullwidth'/>
                <Result />
            </Container>
        </>
    );
}