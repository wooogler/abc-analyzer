import React, { ReactElement, useState } from "react";
import useLogRows from "../hooks/useLogRows";
import { useDimensions } from "../hooks/useDimensions";
import MaterialTable, { MTableHeader } from "material-table";
import LogTableBody from "./LogTableBody";
import { Button } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

interface Props {
  fileName: string;
  sec: number;
  sync: number;
  setSync: React.Dispatch<React.SetStateAction<number>>;
  setSelectedTimestamp: React.Dispatch<React.SetStateAction<number>>;
  playerRef: any;
}

function LogTable({
  fileName,
  sec,
  sync,
  setSync,
  setSelectedTimestamp,
  playerRef,
}: Props): ReactElement {
  const { logData, logColumns } = useLogRows(fileName);
  const [tableRef, { width: tableWidth, height: tableHeight }] =
    useDimensions();
  const [tableHeaderRef, { height: tableHeaderHeight }] = useDimensions();
  const [scrollIndex, setScrollIndex] = useState<number>();
  let testIndex = 100;
  const handleScrollToIndex = () => {
    setScrollIndex(testIndex); //FIXME doesn't work, index rows are not kept after sorting/filtering
    console.log(logData);
  };

  return (
    <div ref={tableRef}>
      <MaterialTable
        title="Log Table"
        columns={logColumns}
        data={logData}
        options={{
          paging: false,
          filtering: true,
          searchFieldAlignment: "left",
          minBodyHeight: "85vh", //FIXME to calculate dynamic height, needed for correct scroll position identification
          maxBodyHeight: "85vh",
        }}
        icons={{ SortArrow: () => <></> } as Record<string, () => JSX.Element>}
        components={{
          Body: (props) => (
            <LogTableBody
              {...props}
              headerHeight={tableHeaderHeight}
              tableWidth={tableWidth}
              tableHeight={tableHeight}
              scrollIndex={scrollIndex}
            />
          ),
          Header: (props) => (
            <div ref={tableHeaderRef} className="table-header-row">
              <MTableHeader {...props} />
            </div>
          ),
        }}
      />
      <Button onClick={handleScrollToIndex}>
        Scroll to index ({testIndex})
      </Button>
    </div>
  );
}

export default LogTable;
