import React, { ReactElement, useState } from "react";
import ReactPlayer from "react-player";

interface Progress {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

function LogPlayer(): ReactElement {
  const [playedSeconds, setPlayedSeconds] = useState<number>(0);

  const onProgress = (e: Progress) => {
    setPlayedSeconds(e.playedSeconds);
  };
  return (
    <ReactPlayer
      url="videos/phone_register.mp4"
      controls={true}
      width="240px"
      height="506px"
      onProgress={onProgress}
      progressInterval={10}
    />
  );
}

export default LogPlayer;
