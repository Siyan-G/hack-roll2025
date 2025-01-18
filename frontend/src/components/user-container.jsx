import React from "react";
import { Container, Divider, Typography } from "@mui/material";
import Result from "./analysis-result/result";
import UploadContainer from "./input/uploadcontainer";


export default function UserContainer() {
    return (    
        <Container fixed={true} sx={{ bgcolor: "lightyellow", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <UploadContainer />
            <Divider />
            <Result />
        </Container>
    );
}