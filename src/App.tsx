import React, { useCallback, useRef, useState } from "react";

import LogTable from "./components/LogTable";
import "antd/dist/antd.css";
import LogPlayer from "./components/LogPlayer";
import ReactPlayer from "react-player";
import { Button, Radio, Switch } from "antd";

const videoName = 'P020_10.webm';
const logName = "20.4.csv";

function App() {
  const [linked, setLinked] = useState<boolean>(true);
  const [sync, setSync] = useState<number>(1629813828796);
  const [sec, setSec] = useState<number>(0);
  const [start, setStart] = useState<number>(6835);
  const [playedSec, setPlayedSec] = useState(0);
  const [selectedTimestamp, setSelectedTimestamp] = useState<number>(0);
  const playerRef = useRef() as React.LegacyRef<ReactPlayer> | undefined;

  const onClickSync = useCallback(() => {
    setSync(selectedTimestamp);
    setStart(playedSec);
  }, [playedSec, selectedTimestamp, setStart, setSync]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-3/4 h-screen">
        <LogTable
          fileName={logName}
          sec={linked ? sec : 0}
          sync={sync}
          setSelectedTimestamp={setSelectedTimestamp}
          playerRef={linked && playerRef}
          setSync={setSync}
          selectedTimestamp={selectedTimestamp}
          start={start}
        />
      </div>
      <div className="flex flex-col w-1/4 h-screen">
        <div className="flex justify-center h-8 items-center pt-2">
          <div className="mr-2">Link:</div>
          <Switch checked={linked} onChange={(checked) => setLinked(checked)} />
          <div className="mx-2"></div>
          <Radio.Group defaultValue="practice" size="small" buttonStyle="solid">
            <Radio.Button value="practice">Practice</Radio.Button>
            <Radio.Button value="main">Main Task</Radio.Button>
          </Radio.Group>
          <div className="mx-2"></div>
          <Button onClick={onClickSync} size="small">
            Sync
          </Button>
          <div className="ml-2">{playedSec}</div>
        </div>
        <LogPlayer
          url={`${
            process.env.NODE_ENV === "development" ? "abc-analyzer/" : ""
          }videos/${videoName}`}
          setSec={setSec}
          setSync={setSync}
          setStart={setStart}
          setPlayedSec={setPlayedSec}
          selectedTimestamp={selectedTimestamp}
          playerRef={playerRef}
          playedSec={playedSec}
        />
      </div>
    </div>
  );
}

export default App;
