import React from 'react';
import { ButtonGroup, Container, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system';
import VideoContainer from './video-container';
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";

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
    setVideoFile(files[0]);
    setReady(true);

  }

    return (
      <Container sx={{ display: "flex", flexDirection: "column", width: "50%", gap: 2 }}>
        <VideoContainer inputVideoFile={videoFile} />
        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ width: "140px" }}
          >
            Select File
            <VisuallyHiddenInput type="file" onChange={handleChange} multiple />
          </Button>
          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            startIcon={<TroubleshootIcon />}
            sx={{ width: "140px" }}
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