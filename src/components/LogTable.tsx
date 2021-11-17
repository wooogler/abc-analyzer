import React, { ReactElement, useCallback, useEffect, useState } from "react";
import {
  AutoSizer,
  GridCellRenderer,
  MultiGrid,
  List,
} from "react-virtualized";
import useLogRows from "../hooks/useLogRows";
import styled from "styled-components";
import _ from "lodash";
import { Checkbox, Input } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

interface Props {
  fileName: string;
  sec: number;
  sync: number;
  start: number;
  selectedTimestamp: number;
  setSync: React.Dispatch<React.SetStateAction<number>>;
  setSelectedTimestamp: React.Dispatch<React.SetStateAction<number>>;
  playerRef: any;
}

interface ValueCount {
  value: string;
  count: number;
  checked: boolean;
  total: number;
}

function LogTable({
  fileName,
  sec,
  sync,
  start,
  setSync,
  setSelectedTimestamp,
  selectedTimestamp,
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
    const initShowColumnIndex = new Array(originalLogColumns.length).fill(true);
    // .map((_, index) => (index === 1 ? false : true));
    console.log(initShowColumnIndex);
    setShowColumnIndex(initShowColumnIndex);
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

  const [rowId, setRowId] = useState("");

  const onClickRow = useCallback(
    (row: { [index: string]: string }) => {
      setRowId(row?._id);
      const timestamp = parseInt(row?.timestamp);
      setSelectedTimestamp(timestamp);
      playerRef.current.seekTo((start + timestamp - sync) / 1000, "seconds");
    },
    [playerRef, setSelectedTimestamp, start, sync]
  );

  const [col, setCol] = useState("");
  const [count, setCount] = useState<ValueCount[] | undefined>([]);

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
            return {
              value: item[0],
              count: count,
              checked: true,
              total: item[1],
            };
          }
          return {
            value: item[0],
            count: count,
            checked: false,
            total: item[1],
          };
        } else {
          return { value: item[0], count: 0, checked: false, total: item[1] };
        }
      })
    );
  }, [col, logData, logState, originalLogColumns]);

  const onClickCol = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, col: string) => {
      if (col === "timestamp") return;
      e.stopPropagation();
      setCol(col);
    },
    []
  );

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
          <CustomCol key={key} style={style} className="cell">
            {column}
          </CustomCol>
        );
      }

      return (
        <CustomRow
          key={key}
          style={style}
          className="cell"
          passed={sec + sync - start >= parseInt(row?.timestamp)}
          selected={row?._id === rowId}
          onClick={() => onClickRow(row)}
        >
          {row && row[column] && row[column].toString()}
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

  const onSelectAllColumns = useCallback((e: CheckboxChangeEvent) => {
    if (!e.target.checked || e.target.indeterminate) {
      setShowColumnIndex((prev) => prev.map(() => false));
    } else {
      setShowColumnIndex((prev) => prev.map(() => true));
    }
  }, []);

  const onSelectAllValues = useCallback((e: CheckboxChangeEvent) => {
    if (!e.target.checked || e.target.indeterminate) {
      setShowRowIndex((prev) => prev.map(() => false));
    } else {
      setShowRowIndex((prev) => prev.map(() => true));
    }
  }, []);

  const [valueList, setValueList] = useState<ValueCount[] | undefined>([]);
  const [columnList, setColumnList] = useState<string[]>([]);

  useEffect(() => {
    setValueList(count);
    setColumnList(originalLogColumns);
  }, [count, originalLogColumns]);

  const onChangeSearchColumn: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        setColumnList(
          originalLogColumns.filter((item) =>
            item.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
      },
      [originalLogColumns]
    );

  const onChangeSearchValue: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        setValueList(
          count?.filter((item) =>
            item.value.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
      },
      [count]
    );
  const showColumnIndexExceptId = showColumnIndex.filter((_, i) => i !== 1);

  return (
    <div className="w-full h-screen">
      {/* <div>
        sec:{sec}, sync: {sync}, timestamp: {selectedTimestamp}, start: {start},
        sec+sync: {sec + sync}
      </div> */}
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
        <div className="flex flex-col ml-4">
          <div className="text-lg font-bold">Show Columns</div>
          <Input size="small" onChange={onChangeSearchColumn} />
          <Checkbox
            checked={showColumnIndexExceptId.every((item) => item === true)}
            indeterminate={
              !showColumnIndexExceptId.every((item) => item === true) &&
              showColumnIndexExceptId.some((item) => item === true)
            }
            onChange={onSelectAllColumns}
            className="p-1"
          >
            Select All
          </Checkbox>
          <div className="h-60 overflow-auto">
            {columnList.map((column, index) => {
              if (column === "_id") return null;
              return (
                <div
                  className={`flex p-1 ${
                    column !== "timestamp" && "cursor-pointer hover:bg-gray-200"
                  } ${column === col && "bg-blue-200"}`}
                  onClick={(e) => onClickCol(e, column)}
                >
                  <Checkbox
                    onChange={() => onChangeColumns(index)}
                    checked={showColumnIndex[index]}
                    key={index}
                  />
                  <div className="w-36 pl-2">{column}</div>
                </div>
              );
            })}
          </div>
        </div>
        {col !== "" && (
          <div className="flex flex-col ml-4">
            <div className="text-lg font-bold">Column Filter - {col}</div>
            <Input size="small" onChange={onChangeSearchValue} />
            <div className="p-1">
              <Checkbox
                checked={count
                  ?.map((item) => item.checked)
                  .every((item) => item === true)}
                indeterminate={
                  !count
                    ?.map((item) => item.checked)
                    .every((item) => item === true) &&
                  count
                    ?.map((item) => item.checked)
                    .some((item) => item === true)
                }
                onChange={onSelectAllValues}
              >
                Select All
              </Checkbox>
            </div>
            <div className="h-60 overflow-auto">
              {valueList
                ?.sort((a, b) => b.total - a.total)
                .map((item) => {
                  return (
                    <div className="p-1">
                      <Checkbox
                        checked={item.checked}
                        indeterminate={item.count !== 0 && !item.checked}
                        onClick={() => onClickFilter(item.value, item.checked)}
                        key={item.value}
                      >
                        {item.value} ({item.count}/{item.total})
                      </Checkbox>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const Styles = styled.div`
  width: 100%;
  height: 60%;
  margin: 1rem;
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

const CustomCol = styled.div``;

export default LogTable;
