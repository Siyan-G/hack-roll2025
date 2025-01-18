import React from 'react';
import { ButtonGroup, Container, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system';
import VideoContainer from './video-container';
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import DeleteIcon from "@mui/icons-material/Delete";
import { Card, CardMedia } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UploadContainer() {

  const [videoFile, setVideoFile] = React.useState(null);
  const [ready, setReady] = React.useState(false);

  const handleChange = (event) => {
    const files = event.target.files;
    setVideoFile(URL.createObjectURL(files[0]));
    setReady(true);

  }

  const handleDelete = () => {
    setVideoFile(null);
    setReady(false);
  }

    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          padding: 1,
        }}
      >
        {ready && <Card sx={{ borderRadius: 2, boxShadow: 3, alignContent: "center", justifyContent: "center", marginBottom: "8px" }}>
          <CardMedia component="video" controls src={videoFile} />
        </Card>}
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{ alignContent: "center", justifyContent: "center" }}
        >
          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ width: "150px" }}
          >
            Select File
            <VisuallyHiddenInput type="file" onChange={handleChange} multiple />
          </Button>
          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            startIcon={<DeleteIcon />}
            sx={{ width: "150px" }}
            disabled={!ready}
            onClick={handleDelete}
          >
            Remove File
          </Button>
          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            startIcon={<TroubleshootIcon />}
            sx={{ width: "150px" }}
            disabled={!ready}
            onClick={() => console.log("Summarising")}
          >
            Summarise
          </Button>
        </ButtonGroup>
        <Divider></Divider>
      </Container>
    );
}