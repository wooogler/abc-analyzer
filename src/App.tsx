import React from "react";

import LogTable from "./components/LogTable";
import "antd/dist/antd.css";

function App() {
  return (
    <div>
      <LogTable fileName="11.csv" />
    </div>
  );
}

export default App;
