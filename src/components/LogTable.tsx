import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { AutoSizer, GridCellRenderer, MultiGrid } from "react-virtualized";
import useLogRows from "../hooks/useLogRows";
import Draggable from "react-draggable";
import styled from "styled-components";
import _ from "lodash";
import Item from "antd/lib/list/Item";
import { Checkbox } from "antd";

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
  const { logData, logColumns: originalLogColumns } = useLogRows(fileName);
  const [logState, setLogState] = useState<
    {
      [index: string]: string;
    }[]
  >();
  const [showColumnIndex, setShowColumnIndex] = useState<boolean[]>([]);
  const [showRowIndex, setShowRowIndex] = useState<boolean[]>([]);

  useEffect(() => {
    setShowColumnIndex(new Array(originalLogColumns.length).fill(true));
    setShowRowIndex(new Array(logData.length).fill(true));
  }, [logData.length, originalLogColumns.length]);

  useEffect(() => {
    const showColumns = originalLogColumns.filter((_, i) => showColumnIndex[i]);
    setLogState(
      logData
        .map((item) => _.pick(item, showColumns))
        .filter((_, i) => showRowIndex[i])
        .sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp))
    );
  }, [logData, originalLogColumns, showColumnIndex, showRowIndex]);

  useEffect(() => {
    const firstTimestamp = logData
      .map((log) => parseInt(log.timestamp))
      .sort()[0];
    setSync(firstTimestamp);
  }, [logData, setSync]);

  const [rowId, setRowId] = useState("");

  const onClickRow = useCallback(
    (row: { [index: string]: string }) => {
      setRowId(row?._id);
      setSelectedTimestamp(parseInt(row?.timestamp));
    },
    [setSelectedTimestamp]
  );

  const [col, setCol] = useState("");
  const [count, setCount] = useState<[string, number, boolean][] | undefined>(
    []
  );

  useEffect(() => {
    const originalCountCol = originalLogColumns.map((col) => ({
      col,
      count: Object.entries(_.countBy(logData?.map((item) => item[col]))),
    }));
    const countCol = originalLogColumns.map((col) => ({
      col,
      count: Object.entries(_.countBy(logState?.map((item) => item[col]))),
    }));
    const selectedCount = countCol.find((item) => item.col === col)?.count;
    const originalSelectedCount = originalCountCol.find(
      (item) => item.col === col
    )?.count;

    setCount(
      originalSelectedCount?.map((item) => {
        if (selectedCount?.map((val) => val[0]).includes(item[0])) {
          const lookup = selectedCount.find((val) => val[0] === item[0]);
          if (lookup === undefined) {
            throw new Error("no lookup");
          }
          const count = lookup[1];
          if (count === item[1]) {
            return [item[0], count, true];
          }
          return [item[0], count, false];
        } else {
          return [item[0], 0, false];
        }
        // if (selectedCount?.map((val) => val[0]).includes(item[0])) {
        //   if (oc[oi][1] === item[1]) return [item[0], item[1], true];
        //   else return [item[0], oc[oi][1], false];
        // } else {
        //   return [item[0], 0, false];
        // }
      })
    );
  }, [col, logData, logState, originalLogColumns]);

  const onClickCol = useCallback((col: string) => {
    setCol(col);
  }, []);

  const CellRenderer: GridCellRenderer = ({
    columnIndex,
    key,
    rowIndex,
    style,
  }) => {
    if (logState) {
      const logColumns = originalLogColumns.filter(
        (_, index) => showColumnIndex[index]
      );
      const column = logColumns[columnIndex];
      const row = logState[rowIndex];
      if (rowIndex === 0) {
        return (
          <CustomCol
            key={key}
            style={style}
            className="cell"
            onClick={() => onClickCol(column)}
            selected={col === column}
          >
            {column}
          </CustomCol>
        );
      }
      return (
        <CustomRow
          key={key}
          style={style}
          className="cell"
          passed={sec + sync >= parseInt(row?.timestamp)}
          selected={row?._id === rowId}
          onClick={() => onClickRow(row)}
        >
          {row && row[column].toString()}
        </CustomRow>
      );
    }
  };

  const onChangeColumns = (index: number) => {
    setShowColumnIndex((prev) =>
      prev.map((item, i) => {
        return index === i ? !item : item;
      })
    );
  };

  const onClickFilter = useCallback(
    (value: string, checked: boolean) => {
      if (checked) {
        setShowRowIndex((prev) =>
          prev.map((item, i) => {
            if (item === true) {
              return logData[i][col] !== value;
            } else {
              return item;
            }
          })
        );
      } else {
        setShowRowIndex((prev) =>
          prev.map((item, i) => {
            if (item === false) {
              return logData[i][col] === value;
            } else {
              return item;
            }
          })
        );
      }
    },
    [col, logData]
  );

  return (
    <div className="w-full h-full">
      <div>{sync}</div>
      <Styles>
        <AutoSizer>
          {({ height, width }) => (
            <MultiGrid
              height={height}
              rowHeight={30}
              width={width}
              fixedColumnCount={1}
              fixedRowCount={1}
              cellRenderer={CellRenderer}
              style={{
                border: "1px solid #ddd",
              }}
              styleTopLeftGrid={{
                borderBottom: "2px solid #aaa",
                borderRight: "2px solid #aaa",
                fontWeight: "bold",
              }}
              rowCount={showRowIndex.filter(Boolean).length}
              columnCount={showColumnIndex.filter(Boolean).length}
              columnWidth={150}
            />
          )}
        </AutoSizer>
      </Styles>
      <div className="flex">
        <div className="flex flex-col">
          {originalLogColumns.map((column, index) => {
            if (column === "_id") return <div></div>;
            return (
              <div>
                <Checkbox
                  onChange={() => onChangeColumns(index)}
                  checked={showColumnIndex[index]}
                  key={index}
                >
                  {column}
                </Checkbox>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col">
          {count
            ?.sort((a, b) => b[1] - a[1])
            .map((item) => {
              return (
                <div>
                  <Checkbox
                    checked={item[2]}
                    indeterminate={item[1] !== 0 && !item[2]}
                    onClick={() => onClickFilter(item[0], item[2])}
                    key={item[0]}
                  >
                    {item[0]} ({item[1]})
                  </Checkbox>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

const Styles = styled.div`
  width: 100%;
  height: 60%;
  .cell {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    :hover {
      overflow: visible;
      white-space: normal;
    }
  }
`;

const CustomRow = styled.div<{ passed: boolean; selected: boolean }>`
  ${({ passed }) =>
    passed &&
    `
    background: yellow;
  `}
  ${({ selected }) =>
    selected &&
    `
    background: red;
  `}
`;

const CustomCol = styled.div<{ selected: boolean }>`
  ${({ selected }) =>
    selected &&
    `
    background: skyblue;
  `}
`;

export default LogTable;
