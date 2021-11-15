import React, { useRef, useState } from "react";

import LogTable from "./components/LogTable";
import "antd/dist/antd.css";
import LogPlayer from "./components/LogPlayer";
import ReactPlayer from "react-player";

function App() {
  const [sync, setSync] = useState<number>(0);
  const [sec, setSec] = useState<number>(0);
  const [selectedTimestamp, setSelectedTimestamp] = useState<number>(0);
  const playerRef = useRef() as React.LegacyRef<ReactPlayer> | undefined;

  return (
    <div className="flex">
      <div className="w-2/3 h-screen">
        <LogTable
          fileName="20.4.csv"
          sec={sec}
          sync={sync}
          setSelectedTimestamp={setSelectedTimestamp}
          playerRef={playerRef}
          setSync={setSync}
        />
      </div>
      <div className="w-1/3 h-screen">
        <LogPlayer
          url="videos/P020_10.webm"
          setSec={setSec}
          setSync={setSync}
          selectedTimestamp={selectedTimestamp}
          playerRef={playerRef}
        />
      </div>
    </div>
  );
}

export default App;
