import { CardMedia } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";

export default function VideoContainer({ inputVideoFile }) {
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    if (inputVideoFile) {
      // setVideoFile(URL.createObjectURL(inputVideoFile));
      const fileUrl = URL.createObjectURL(inputVideoFile)
      setVideoFile({
        file: inputVideoFile,
        url: fileUrl
      })
    }
  }, [inputVideoFile]);


  return (
    <>
      {fileUrl && (
        <Card sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}>
            <CardMedia component="video" controls src={fileURL} />
        </Card>
      )}
    </>
  );
}
