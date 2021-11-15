import { Button } from "antd";
import React, { ReactElement, useState } from "react";
import ReactPlayer from "react-player";

interface Props {
  url: string;
  setSec: React.Dispatch<React.SetStateAction<number>>;
  setSync: React.Dispatch<React.SetStateAction<number>>;
  selectedTimestamp: number;
  playerRef: React.LegacyRef<ReactPlayer> | undefined;
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
  setSync,
  selectedTimestamp,
  playerRef,
}: Props): ReactElement {
  const [playedSec, setPlayedSec] = useState(0);
  const onProgress = (e: Progress) => {
    setSec(Math.floor(e.playedSeconds * 1000));
    setPlayedSec(Math.floor(e.playedSeconds * 1000));
  };
  return (
    <div className="h-full w-full">
      <ReactPlayer
        url={url}
        controls={true}
        width="100%"
        height="90%"
        onProgress={onProgress}
        progressInterval={10}
        ref={playerRef}
      />
      {/* <div>{playedSec}</div> */}
      <Button onClick={() => setSync(selectedTimestamp)}>Sync</Button>
    </div>
  );
}

export default LogPlayer;
