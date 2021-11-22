import { Tree } from "antd";
import { DataNode } from "antd/lib/tree";
import _ from "lodash";
import React, { ReactElement, useCallback } from "react";

interface Props {
  originalLogColumns: string[];
  setShowColumnIndex: React.Dispatch<React.SetStateAction<boolean[]>>;
  setShowRowIndex: React.Dispatch<React.SetStateAction<boolean[]>>;
  setCol: React.Dispatch<React.SetStateAction<string>>;
  logData: {
    [index: string]: string;
  }[];
}

const datumTypes = ["app", "key", "noti", "msg", "call", "media"];

const columnData: DataNode[] = [
  {
    title: "APP_USAGE_EVENT",
    key: "APP_USAGE_EVENT",
    selectable: false,
    children: [
      { title: "name", key: "app-name" },
      { title: "packageName", key: "app-packageName" },
      { title: "type", key: "app-type" },
    ],
  },
  {
    title: "KEY_LOG",
    key: "KEY_LOG",
    selectable: false,
    children: [
      { title: "name", key: "key-name" },
      { title: "packageName", key: "key-packageName" },
      { title: "currentKey", key: "key-currentKey" },
      { title: "timeTaken", key: "key-timeTaken" },
    ],
  },
  {
    title: "NOTIFICATION",
    key: "NOTIFICATION",
    selectable: false,
    children: [
      { title: "name", key: "noti-name" },
      { title: "packageName", key: "noti-packageName" },
      { title: "isPosted", key: "noti-isPosted" },
    ],
  },
  {
    title: "MESSAGE",
    key: "MESSAGE",
    selectable: false,
    children: [{ title: "messageBox", key: "msg-messageBox" }],
  },
  {
    title: "CALL_LOG",
    key: "CALL_LOG",
    selectable: false,
    children: [
      { title: "type", key: "call-type" },
      { title: "presentation", key: "call-presentation" },
    ],
  },
  {
    title: "MEDIA",
    key: "MEDIA",
    selectable: false,
  },
];

function ShowColumns({
  originalLogColumns,
  setShowColumnIndex,
  setShowRowIndex,
  setCol,
  logData,
}: Props): ReactElement {
  const onCheckColumn = useCallback(
    (checked: any) => {
      const columns = [
        "timestamp",
        "_id",
        "datumType",
        ..._.uniq(
          checked
            .filter((col: string) => col.includes("-"))
            .map((col: string) => col.split("-")[1])
        ),
      ];
      setShowRowIndex(logData.map((row) => checked.includes(row.datumType)));
      setShowColumnIndex(
        originalLogColumns.map((col) => columns.includes(col))
      );
    },
    [logData, originalLogColumns, setShowColumnIndex, setShowRowIndex]
  );
  const onSelectColumn = useCallback(
    (selected: any) => {
      setCol(selected[0].split("-")[1]);
    },
    [setCol]
  );
  return (
    <Tree
      checkable
      treeData={columnData}
      onCheck={onCheckColumn}
      onSelect={onSelectColumn}
      defaultExpandedKeys={["all"]}
    />
  );
}

export default ShowColumns;
