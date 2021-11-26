import React, { ReactElement, useCallback, useEffect, useState } from "react";
import {
  AutoSizer,
  GridCellRenderer,
  Index,
  MultiGrid,
} from "react-virtualized";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import useLogRows from "../hooks/useLogRows";
import styled from "styled-components";
import _ from "lodash";
import { Checkbox, Input, Tooltip } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import ShowColumns, { defaultDatumTypes } from "./ShowColumns";
import TaskSheet from "./TaskSheet";

interface Props {
  fileName: string;
  sec: number;
  sync: number;
  start: number;
  selectedTimestamp: number;
  setSync: React.Dispatch<React.SetStateAction<number>>;
  setSelectedTimestamp: React.Dispatch<React.SetStateAction<number>>;
  playerRef: any | undefined;
}

interface ValueCount {
  value: string;
  count: number;
  checked: boolean;
  total: number;
}

dayjs.extend(localizedFormat);

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
  const [selectedDatumType, setSelectedDatumType] = useState<string>("");
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
    setShowColumnIndex(initShowColumnIndex);
    setShowRowIndex(
      logData.map((item) => defaultDatumTypes.includes(item.datumType))
    );
  }, [logData, originalLogColumns.length]);
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
      setSelectedTimestamp(parseInt(row?.timestamp));
      setSelectedDatumType(row?.datumType);
      if (playerRef) {
        playerRef.current.seekTo((start + timestamp - sync) / 1000, "seconds");
      }
    },
    [playerRef, setSelectedTimestamp, start, sync]
  );

  const [col, setCol] = useState("");
  const [datumTypes, setDatumTypes] = useState<string[]>(defaultDatumTypes);
  const [count, setCount] = useState<ValueCount[] | undefined>([]);

  useEffect(() => {
    const logs = logData.filter((log) => datumTypes.includes(log.datumType));
    const originalCountCol = originalLogColumns.map((col) => ({
      col,
      count: Object.entries(_.countBy(logs?.map((item) => item[col]))),
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
  }, [col, datumTypes, logData, logState, originalLogColumns]);

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
            {columnIndex === 0 ? 'Datetime':column}
          </CustomCol>
        );
      }

      const value =
        columnIndex !== 0
          ? row && row[column] && row[column].toString()
          : row && dayjs(parseInt(row[column])).format("MM/DD hh:mm:ss.SSS");

      return (
        <CustomRow
          key={key}
          style={style}
          className="cell"
          passed={sec + sync - start >= parseInt(row?.timestamp)}
          selected={row?._id === rowId}
          onClick={() => onClickRow(row)}
        >
          <Tooltip title={value}>{value}</Tooltip>
        </CustomRow>
      );
    }
  };
  const [passedIndex, setPassedIndex] = useState(0);
  useEffect(() => {
    const rowIndex = logState
      ? logState.findIndex(
          (item) => sec + sync - start <= parseInt(item?.timestamp)
        )
      : 0;
    setPassedIndex(rowIndex + 5);
  }, [logState, sec, start, sync]);

  const onClickFilter = useCallback(
    (value: string, checked: boolean) => {
      if (checked) {
        setShowRowIndex((prev) =>
          prev.map((item, i) => {
            if (item === true && datumTypes.includes(logData[i].datumType)) {
              return logData[i][col] !== value;
            } else {
              return item;
            }
          })
        );
      } else {
        setShowRowIndex((prev) =>
          prev.map((item, i) => {
            if (item === false && datumTypes.includes(logData[i].datumType)) {
              return logData[i][col] === value;
            } else {
              return item;
            }
          })
        );
      }
    },
    [col, datumTypes, logData]
  );

  const onSelectAllValues = useCallback(
    (e: CheckboxChangeEvent) => {
      if (!e.target.checked || e.target.indeterminate) {
        setShowRowIndex((prev) => prev.map(() => false));
      } else {
        setShowRowIndex((prev) =>
          prev.map((item, i) => {
            if (datumTypes.includes(logData[i].datumType)) {
              return true;
            }
            return item;
          })
        );
      }
    },
    [datumTypes, logData]
  );

  const [valueList, setValueList] = useState<ValueCount[] | undefined>([]);

  useEffect(() => {
    setValueList(count);
  }, [count, originalLogColumns]);

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

  const colToIndex = useCallback(
    (col: string) => {
      const colIndex = originalLogColumns
        .map((item, i) => ({ name: item, index: i }))
        .filter((item) => showColumnIndex[item.index]);
      return colIndex?.find((item) => item.name === col)?.index;
    },
    [originalLogColumns, showColumnIndex]
  );
  const getColumnWidth: (params: Index) => number = useCallback(
    ({ index }) => {
      if (index === 0) {
        return 150;
      } else if (index === colToIndex("datumType")) {
        return 150;
      } else if (index === colToIndex("type")) {
        return 250;
      } else if (index === colToIndex("name")) {
        return 100;
      } else if (index === colToIndex("packageName")) {
        return 300;
      } else if (index === colToIndex("_id")) {
        return 0;
      }
      return 70;
    },
    [colToIndex]
  );

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
              styleTopLeftGrid={{
                borderRight: "1px solid rgba(0, 0, 0, 0.5)",
              }}
              styleBottomLeftGrid={{
                borderRight: "1px solid rgba(0, 0, 0, 0.5)",
              }}
              rowCount={showRowIndex.filter(Boolean).length}
              columnCount={showColumnIndex.filter(Boolean).length}
              columnWidth={getColumnWidth}
              scrollToRow={passedIndex}
            />
          )}
        </AutoSizer>
      </Styles>
      <div className="flex">
        <div className="flex flex-col ml-4">
          <div className="text-lg font-bold">Show Columns</div>
          <ShowColumns
            originalLogColumns={originalLogColumns}
            setShowColumnIndex={setShowColumnIndex}
            setCol={setCol}
            logData={logData}
            setDatumTypes={setDatumTypes}
            setShowRowIndex={setShowRowIndex}
          />
        </div>
        {(col !== "" || valueList?.length === 0) && (
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
                .map((item, index) => {
                  return (
                    <div className="p-1" key={index}>
                      <Checkbox
                        checked={item.checked}
                        indeterminate={item.count !== 0 && !item.checked}
                        onClick={() => onClickFilter(item.value, item.checked)}
                      >
                        {item.value} ({item.count}/{item.total})
                      </Checkbox>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        <div className="ml-auto">
          <TaskSheet
            timestamp={selectedTimestamp.toString()}
            datumType={selectedDatumType}
          />
        </div>
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
  }
`;

const CustomRow = styled.div<{ passed: boolean; selected: boolean }>`
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  padding-left: 0.25rem;
  line-height: 30px;
  ${({ passed }) =>
    passed &&
    `
    background-color: #E6F7FF;
  `}
  ${({ selected }) =>
    selected &&
    `
    background-color: #1890FF;
    color: white;
  `}
`;

const CustomCol = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  padding-left: 0.25rem;
  background-color: #fafafa;
  line-height: 30px;
`;

export default LogTable;
