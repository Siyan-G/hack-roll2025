import React from "react";
import { AppBar, Box, Container, Divider, Toolbar, Typography } from "@mui/material";
import Result from "./analysis-result/result";
import UploadContainer from "./input/uploadcontainer";


export default function UserContainer() {
    return (    
        <>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Bruh
                </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth={false} sx={{ bgcolor: "lightyellow", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center",}}>
                <UploadContainer />
                <Divider />
                <Result sx={{overflow: "auto"}}/>
            </Container>
        </>
    );
}