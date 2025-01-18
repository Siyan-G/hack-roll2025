import React, { useContext } from 'react';
import { ButtonGroup, Container, Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system';
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import DeleteIcon from "@mui/icons-material/Delete";
import { Card, CardMedia } from "@mui/material";
import { VideoContext } from '../../contexts/VideoContext';

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



export default function UploadContainer({ onApiReturn }) {

  const { videoRef } = useContext(VideoContext);
  const [videoFile, setVideoFile] = React.useState(null);
  const [ready, setReady] = React.useState(false);

  const handleApiSuccess = () => {
    onApiReturn();
  };

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
          alignItems: "center",
        }}
      >

        {!ready && <Typography variant="h6" mt= "10px" mb="5px">
            Upload your video file here!
        </Typography>}

        {ready && <Card sx={{ borderRadius: 2, boxShadow: 3, alignContent: "center", justifyContent: "center", marginBottom: "8px" }}>
          <CardMedia component="video" controls src={videoFile} ref={videoRef}/>
        </Card>}
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{ alignContent: "center", justifyContent: "center", marginTop: "35px" }}
        >
          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ width: "150px" }}
          >
            Select File
            <VisuallyHiddenInput type="file" accept="video/*" onChange={handleChange} multiple />
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
            onClick={handleApiSuccess}
          >
            Summarise
          </Button>
        </ButtonGroup>
        <Divider></Divider>
      </Container>
    );
}