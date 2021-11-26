import { Button } from "antd";
import React, { ReactElement, useState } from "react";
import SpreadSheet, { Matrix, Point } from "react-spreadsheet";

interface Props {
  datumType: string;
  timestamp: string;
}

function TaskSheet({ datumType, timestamp }: Props): ReactElement {
  const [rowIndex, setRowIndex] = useState<number>(0);

  const [taskData, setTaskData] = useState<Matrix<{ value: string | null }>>([
    [
      { value: "메세지 앱( 문자 도착)" },
      { value: null },
      { value: null },
      { value: null },
    ],
    [
      { value: "문자 도착 알람" },
      { value: null },
      { value: null },
      { value: null },
    ],
    [
      { value: "문자 앱 들어감" },
      { value: null },
      { value: null },
      { value: null },
    ],
    [{ value: "전화 옴" }, { value: null }, { value: null }, { value: null }],
    [
      { value: "알람 - 통화 옴" },
      { value: null },
      { value: null },
      { value: null },
    ],
    [
      { value: "알람 - 통화 거절함" },
      { value: null },
      { value: null },
      { value: null },
    ],
    [
      { value: "마지막 타이핑" },
      { value: null },
      { value: null },
      { value: null },
    ],
    [
      { value: "문자 보낸 시각" },
      { value: null },
      { value: null },
      { value: null },
    ],
    [
      { value: "문자 앱 나옴" },
      { value: null },
      { value: null },
      { value: null },
    ],
  ]);
  const onClickCopy = () => {
    setTaskData((prev) => {
      return prev?.map((row, index) => {
        if (index === rowIndex) {
          return [row[0], { value: datumType }, row[2], { value: timestamp }];
        }
        return row;
      });
    });
  };
  const onSelectCell = (selected: Point[]) => {
    if (selected !== [] && selected[0]) {
      setRowIndex(selected[0].row);
    }
  };
  
  return (
    <>
      <div className="flex">
        <div className="text-lg font-bold">Task Sheet</div>
        <Button className="ml-auto" onClick={onClickCopy} size='small'>
          Copy data to sheet
        </Button>
      </div>
      <div className="h-60 overflow-auto">
        <SpreadSheet
          data={taskData}
          onSelect={onSelectCell}
          hideRowIndicators={true}
          columnLabels={["Task", "DatumType", "Event", "Timestamp"]}
        />
      </div>
    </>
  );
}

export default TaskSheet;
