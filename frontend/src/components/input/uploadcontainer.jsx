import React from 'react';
import { Container, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system';
import Status from './status';
import VideoThumbnail from './video-thumbnail';

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

  const handleChange = (event) => {
    const files = event.target.files;
    setVideoFile(files[0]);
  }

    return (
      <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
        <VideoThumbnail inputVideoFile={videoFile}/>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload files
          <VisuallyHiddenInput
            type="file"
            onChange={handleChange}
            multiple
          />
        </Button>
        <Divider>

        </Divider>
        <Status />
      </Container>
    );
}