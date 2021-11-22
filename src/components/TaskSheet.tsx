import { Button } from "antd";
import React, { ReactElement, useState } from "react";
import SpreadSheet, { Matrix, Point } from "react-spreadsheet";

interface Props {
  timestamp: string;
}

function TaskSheet({ timestamp }: Props): ReactElement {
  const [rowIndex, setRowIndex] = useState<number>(0);

  const [taskData, setTaskData] = useState<Matrix<{ value: string | null }>>([
    [{ value: "Phone receive" }, { value: null }],
    [{ value: "SMS reply (장소)" }, { value: null }],
    [{ value: "SMS reply (시간)" }, { value: null }],
    [{ value: "SMS reply (요일)" }, { value: null }],
    [{ value: "SMS reply (타이핑)" }, { value: null }],
    [{ value: "Camera (순서)" }, { value: null }],
    [{ value: "Camera (삭제)" }, { value: null }],
    [{ value: "Location (장소 경로 링크)" }, { value: null }],
    [{ value: "Location (평점)" }, { value: null }],
    [{ value: "Location (문자 받는 사람)" }, { value: null }],
    [{ value: "Location (송금액)" }, { value: null }],
  ]);
  const onClickCopy = () => {
    setTaskData((prev) => {
      return prev?.map((row, index) => {
        if (index === rowIndex) {
          return [row[0], { value: timestamp }];
        }
        return row;
      });
    });
  };
  const onSelectCell = (selected: Point[]) => {
    if (selected !== [] && selected[0]) {
      console.log(selected);
      setRowIndex(selected[0].row);
    }
  };
  return (
    <>
      <div className="flex">
        <div className="text-lg font-bold">Task Sheet</div>
        <Button className="ml-auto" onClick={onClickCopy}>
          Copy Timestamp
        </Button>
      </div>
      <div className="h-60 overflow-auto">
        <SpreadSheet data={taskData} onSelect={onSelectCell} />
      </div>
    </>
  );
}

export default TaskSheet;
