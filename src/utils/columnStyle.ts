import { CSSProperties } from "@material-ui/core/styles/withStyles";

export const columnStyle = (
  width: CSSProperties["width"] = "",
  align?: CSSProperties["textAlign"],
  firstCol?: boolean
): CSSProperties => ({
  width: width,
  maxWidth: width,
  cellStyle: {
    width: width,
    maxWidth: width,
    textAlign: align,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    paddingLeft: firstCol ? "1rem" : "auto",
  },
  headerStyle: {
    width: width,
    maxWidth: width,
    textAlign: align,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    paddingLeft: firstCol ? "1rem" : "auto",
  },
  filterCellStyle: {
    width: width,
    maxWidth: width,
    textAlign: align,
    position: "sticky",
    top: "41px", // header height
    backgroundColor: "white",
  },
});
