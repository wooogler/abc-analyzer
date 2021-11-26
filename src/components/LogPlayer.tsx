import React, { ReactElement } from "react";
import ReactPlayer from "react-player";

interface Props {
  url: string;
  setSec: React.Dispatch<React.SetStateAction<number>>;
  setSync: React.Dispatch<React.SetStateAction<number>>;
  setStart: React.Dispatch<React.SetStateAction<number>>;
  selectedTimestamp: number;
  playerRef: React.LegacyRef<ReactPlayer> | undefined;
  setPlayedSec: React.Dispatch<React.SetStateAction<number>>;
  playedSec: number;
}

interface Progress {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

function LogPlayer({
  url,
  setSec,
  setPlayedSec,
  playerRef,
}: Props): ReactElement {
  const onProgress = (e: Progress) => {
    setSec(Math.floor(e.playedSeconds * 1000));
    setPlayedSec(Math.floor(e.playedSeconds * 1000));
  };

  return (
    <div className="flex flex-col h-full w-full pl-4 pt-2 pb-8 justify-center items-center">
      <ReactPlayer
        url={url}
        controls={true}
        width="100%"
        height="100%"
        onProgress={onProgress}
        progressInterval={10}
        ref={playerRef}
      />
    </div>
  );
}

export default LogPlayer;
