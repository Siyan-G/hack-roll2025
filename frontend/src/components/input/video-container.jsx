import { CardMedia } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";

export default function VideoContainer({ inputVideoFile }) {
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    if (inputVideoFile) {
      setVideoFile(URL.createObjectURL(inputVideoFile));
    }
  }, [inputVideoFile]);


  return (
    <>
      {videoFile && 
        <Card sx={{ width: '600px', borderRadius: 2, boxShadow: 3 }}>
          <CardMedia component="video" controls src={videoFile} />
        </Card>
      }
    </>
  );
}
