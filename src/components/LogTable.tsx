import React, {
  createRef,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Row,
  useBlockLayout,
  useFilters,
  useResizeColumns,
  useSortBy,
  useTable,
} from "react-table";
import styled from "styled-components";
import useLogRows from "../hooks/useLogRows";
import scrollbarWidth from "../utils/scrollbarWidth";
import { FixedSizeList as List } from "react-window";
import { useSticky } from "react-table-sticky";

interface Props {
  fileName: string;
  sec: number;
  sync: number;
  setSync: React.Dispatch<React.SetStateAction<number>>;
  setSelectedTimestamp: React.Dispatch<React.SetStateAction<number>>;
  playerRef: any;
}

const listRef = createRef<any>();

const Styles = styled.div`
  .table {
    border: 1px solid #ddd;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      padding: 5px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      background-color: #fff;
      overflow: hidden;

      :last-child {
        border-right: 0;
      }
    }

    &.sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }

      .header {
        top: 0;
        box-shadow: 0px 3px 3px #ccc;
      }

      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }

      .body {
        position: relative;
        z-index: 0;
      }

      [data-sticky-td] {
        position: sticky;
      }

      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }

      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px #ccc;
      }
    }
  }
`;

function LogTable({
  fileName,
  sec,
  sync,
  setSync,
  setSelectedTimestamp,
  playerRef,
}: Props): ReactElement {
  const { logData, logColumns } = useLogRows(fileName);
  useEffect(() => {
    const firstTimestamp = logData
      .map((log) => parseInt(log.timestamp))
      .sort()[0];
    setSync(firstTimestamp);
  }, [logData, setSync]);

  const filterTypes = useMemo(
    () => ({
      multiSelect: (rows: Row<object>[], id: any, filterValues: any) => {
        if (filterValues.length === 0) return rows;
        return rows.filter((r) => filterValues.includes(r.values[id]));
      },
    }),
    []
  );
  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    []
  );
  const scrollBarSize = useMemo(() => scrollbarWidth(), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
    allColumns,
  } = useTable(
    {
      data: logData,
      columns: logColumns,
      defaultColumn,
      filterTypes,
      initialState: {
        sortBy: [
          {
            id: "timestamp",
            desc: false,
          },
        ],
      },
    },
    useBlockLayout,
    useResizeColumns,
    useFilters,
    useSortBy,
    useSticky
  );

  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);

  const onClickRow = useCallback(
    (index: number, timestamp: number) => {
      setSelectedRowIndex(index);
      setSelectedTimestamp(timestamp);
      // console.log((sec + timestamp - sync) / 1000);
      playerRef.current.seekTo((sec + timestamp - sync) / 1000);
    },
    [setSelectedTimestamp, sync, sec, playerRef]
  );

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];
      const timestamp = parseInt(row.values.timestamp);
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className={`tr ${selectedRowIndex === index && "bg-yellow-100 "}${
            sec + sync >= timestamp && "bg-red-100 "
          }cursor-pointer`}
          onClick={() => {
            onClickRow(index, timestamp);
          }}
        >
          {row.cells.map((cell) => {
            return (
              <div {...cell.getCellProps()} className="td">
                {cell.render("Cell")}
              </div>
            );
          })}
        </div>
      );
    },
    [rows, prepareRow, selectedRowIndex, sec, sync, onClickRow]
  );

  const [selectedCol, setSelectedCol] = useState("");

  const onClickCol = useCallback((col: string) => {
    setSelectedCol(col);
    console.log(col);
  }, []);

  return (
    <Styles className="flex flex-col">
      <div>
        {sec + sync}, {sync}
      </div>
      <div
        {...getTableProps()}
        className="table sticky overflow-auto"
        style={{ width: 500, height: 500 }}
      >
        <div className="header">
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div
                  {...column.getHeaderProps()}
                  className={`th ${
                    column.id === selectedCol ? "bg-blue-100" : "bg-white"
                  }`}
                  onClick={() => onClickCol(column.id)}
                >
                  {column.render("Header")}
                  <div
                    {...column.getResizerProps()}
                    className={`resizer ${
                      column.isResizing ? "isResizing" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()} className="body">
          <List
            height={500}
            itemCount={rows.length}
            itemSize={35}
            width={totalColumnsWidth + scrollBarSize}
            ref={listRef}
          >
            {RenderRow}
          </List>
        </div>
      </div>
      <div className="flex">
        <div>
          <div className="text-lg mb-2">Show Columns</div>
          <div className="h-72 w-48 overflow-auto">
            {allColumns.map((column) => (
              <div key={column.id}>
                <label>
                  <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
                  {column.id}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers
                .filter((column) => column.id === selectedCol)
                .map((column, index) => (
                  <div key={index}>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
      {/* <Button
        onClick={() => {
          listRef.current.scrollToItem(200);
        }}
      >
        go to 200
      </Button> */}
    </Styles>
  );
}

export default LogTable;
