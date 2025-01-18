import React, { useState } from "react";
import { AppBar, Container, Divider, Toolbar, Typography } from "@mui/material";
import Result from "./analysis-result/result";
import UploadContainer from "./input/uploadcontainer";

export default function UserContainer() {
      const [apiReturned, setApiReturned] = useState(false);

      const handleApiReturn = () => {
        setApiReturned(true);
      };

      return (    
        <>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Video Analysis Tool
                </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth={false} sx={{ bgcolor: "lightyellow", display: "flex", flexDirection: "row", height: "100vh" , width: "full"}}>
                <UploadContainer onApiReturn={handleApiReturn} />
                <Divider />
                {apiReturned && <Result />}
            </Container>
        </>
    );
}