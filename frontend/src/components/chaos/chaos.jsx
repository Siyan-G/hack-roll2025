import React, { useRef, useState } from "react";
import { Box, CardMedia, Button } from "@mui/material";
import chaos from "../../assets/chaos.mp4";

const Chaos = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          borderRadius: 1,
          boxShadow: 2,
          width: "150px",
          height: "150px",
        }}
      >
        <CardMedia
          component="video"
          autoPlay
          loop
          muted={isMuted}
          src={chaos}
          ref={videoRef}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <Button
        variant="contained"
        color={isMuted ? "primary" : "secondary"}
        onClick={toggleSound}
        size="small"
        sx={{ marginTop: 1 }}
      >
        {isMuted ? "Muted" : "Not Muted"}
      </Button>
    </Box>
  );
};

export default Chaos;
