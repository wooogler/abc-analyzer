import React, { useRef, useState } from "react";

import LogTable from "./components/LogTable";
import "antd/dist/antd.css";
import LogPlayer from "./components/LogPlayer";
import ReactPlayer from "react-player";
import { Switch } from "antd";

function App() {
  const [linked, setLinked] = useState<boolean>(true);
  const [sync, setSync] = useState<number>(1629813828796);
  const [sec, setSec] = useState<number>(0);
  const [start, setStart] = useState<number>(6835);
  const [selectedTimestamp, setSelectedTimestamp] = useState<number>(0);
  const playerRef = useRef() as React.LegacyRef<ReactPlayer> | undefined;

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-2/3 h-screen">
        <LogTable
          fileName="20.4.csv"
          sec={linked ? sec : 0}
          sync={sync}
          setSelectedTimestamp={setSelectedTimestamp}
          playerRef={linked && playerRef}
          setSync={setSync}
          selectedTimestamp={selectedTimestamp}
          start={start}
        />
      </div>
      <div className="w-1/3 h-screen">
        <div className="flex justify-center">
          <div className="mr-2">Link:</div>
          <Switch checked={linked} onChange={(checked) => setLinked(checked)} />
        </div>
        <LogPlayer
          url={`${
            process.env.NODE_ENV === "development" && "abc-analyzer/"
          }videos/P020_10.webm`}
          setSec={setSec}
          setSync={setSync}
          setStart={setStart}
          selectedTimestamp={selectedTimestamp}
          playerRef={playerRef}
        />
      </div>
    </div>
  );
}

export default App;
