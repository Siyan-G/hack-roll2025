import { CardMedia } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";

export default function VideoThumbnail({ inputVideoFile }) {
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    if (inputVideoFile) {
      setVideoFile(URL.createObjectURL(inputVideoFile));
    }
  }, [inputVideoFile]);


  return (
    <>
      {videoFile && 
        <Card>
          <CardMedia component="video" controls src={videoFile} />
        </Card>
      }
    </>
  );
}
