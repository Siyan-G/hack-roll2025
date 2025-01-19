import React from "react";
import { Box } from "@mui/material";
import chaos from "../../assets/chaos.mp4";

const AutoPlayVideo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 3, 
        width: "160px",
        height: "160px",
      }}
    >
      <video
        src={chaos}
        autoPlay={true}
        muted={false}
        loop
        controls
        style={{
          width: "150px",
          height: "150px",
          objectFit: "cover", 
        }}
      />
    </Box>
  );
};

export default AutoPlayVideo;