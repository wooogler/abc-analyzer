import _ from "lodash";
import Papa from "papaparse";
import { useEffect, useMemo, useState } from "react";
import MultiCheckBoxColumnFilter from "../components/MultiCheckBoxColumnFilter";

function flattenObject(ob: any) {
  var toReturn: any = {};

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] == "object" && ob[i] !== null) {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + "_" + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

const getlogRows = (logRaws: string[][]) =>
  logRaws.map<{ [index: string]: string }>((log, index) => {
    const _id = log[0];
    const datumType = log[1];
    const timestamp = log[5];
    console.log(_id);
    const value = log[8]?.replaceAll('""', '"').replaceAll(': ", ', ': "", ');
    let parsedValue = {};
    try {
      parsedValue = JSON.parse(value);
    } catch (e) {
      console.log(index, value);
    }
    const flattenedValue = flattenObject(parsedValue);
    return { _id, datumType, timestamp, ...flattenedValue };
  });

const getColumns = (data: { [index: string]: string }[]) => {
  const columnList = data.reduce<string[]>((acc, row) => {
    const keys = Object.keys(row);
    return _.union(acc, keys);
  }, []);
  let newColumnList = columnList.filter((item) => item !== "timestamp");
  newColumnList.unshift("timestamp");

  return newColumnList.map((key) => {
    if (key === "timestamp") {
      return {
        Header: key,
        accessor: key,
        sticky: "left",
      };
    }
    return {
      Header: key,
      accessor: key,
      Filter: MultiCheckBoxColumnFilter,
      filter: "multiSelect",
    };
  });
};

function useLogRows(fileName: string) {
  const [logData, setLogData] = useState<{ [index: string]: string }[]>([]);
  const logColumns = useMemo(() => getColumns(logData), [logData]);
  useEffect(() => {
    async function getLogs() {
      const response = await fetch("logs/" + fileName);
      const reader = response.body?.getReader();
      const result = await reader?.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result?.value);
      const results = Papa.parse<string[]>(csv);
      const logRaws = results.data;
      const logRows = getlogRows(logRaws);
      const logColumns = logRows.reduce<string[]>((acc, row) => {
        const keys = Object.keys(row);
        return _.union(acc, keys);
      }, []);
      const res = logColumns.reduce((ac, a) => ({ ...ac, [a]: "empty" }), {});
      const logs = logRows.map((item) => Object.assign({}, res, item));
      setLogData(logs);
    }
    getLogs();
  }, [fileName]);

  return { logData, logColumns };
}

export default useLogRows;
