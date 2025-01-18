import React, { useState } from "react";
import { AppBar, Container, Divider, Toolbar, Typography } from "@mui/material";
import Result from "./analysis-result/result";
import UploadContainer from "./input/uploadcontainer";
import { VideoProvider } from "../contexts/VideoContext";

export default function UserContainer() {
      const [apiReturned, setApiReturned] = useState(false);

      const handleApiReturn = () => {
        setApiReturned(true);
      };

      return (    
        <VideoProvider>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    bRuDdErS
                </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth={false} sx={{ bgcolor: "lightyellow", display: "flex", flexDirection: "row", height: "100vh" , width: "full"}}>
                <UploadContainer />
                <Divider />
                {apiReturned && <Result />}
            </Container>
        </VideoProvider>
    );
}