import React, {
  createRef,
  ReactElement,
  useCallback,
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

interface Props {
  fileName: string;
}

const listRef = createRef<any>();

const Styles = styled.div`
  padding: 1rem;

  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid black;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      :last-child {
        border-right: 1px solid black;
      }
      .resizer {
        display: inline-block;
        width: 10px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${"" /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;
        &:hover {
          background: skyblue;
        }

        &.isResizing {
          background: red;
        }
      }
    }
  }
`;

function LogTable({ fileName }: Props): ReactElement {
  const { logData, logColumns } = useLogRows(fileName);
  const filterTypes = useMemo(
    () => ({
      multiSelect: (rows: Row<object>[], id: any, filterValues: any) => {
        if (filterValues.length === 0) return rows;
        return rows.filter((r) => filterValues.includes(r.values[id]));
      },
    }),
    []
  );
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    []
  );
  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);

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
    useSortBy
  );

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
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
    [prepareRow, rows]
  );

  const [selectedCol, setSelectedCol] = useState("");

  const onClickCol = useCallback((col: string) => {
    setSelectedCol(col);
    console.log(col);
  }, []);

  return (
    <Styles className="flex flex-col">
      <div {...getTableProps()} className="table w-2/3 overflow-auto">
        <div>
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

        <div {...getTableBodyProps()}>
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
          <div className="h-80 w-48 overflow-auto">
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
