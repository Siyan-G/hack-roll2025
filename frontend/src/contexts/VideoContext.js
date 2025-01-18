import React, { createContext, useRef, useState } from "react";

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const videoRef = useRef(null);
  const [timestamp, setTimestamp] = useState(0);

  const seekToTimestamp = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    setTimestamp(time);
  };

  return (
    <VideoContext.Provider value={{ videoRef, seekToTimestamp }}>
      {children}
    </VideoContext.Provider>
  );
};
