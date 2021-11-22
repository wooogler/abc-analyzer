import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { readRemoteFile } from "react-papaparse";

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
      toReturn[i] = String(ob[i]);
    }
  }
  return toReturn;
}

const getlogRows = (logRaws: string[][]) =>
  logRaws.map<{ [index: string]: string }>((log, index) => {
    const _id = log[0];
    const datumType = log[1];
    const timestamp = log[5];
    const value = log[8]?.replaceAll('""', '"').replaceAll(': ", ', ': "", ');
    try {
      return { timestamp, _id, datumType, ...flattenObject(JSON.parse(value)) };
    } catch (e) {
      console.log(e);
      return { timestamp, _id, datumType };
    }
  });

const getColumns = (data: { [index: string]: string }[]) => {
  return data.reduce<string[]>((acc, row) => {
    const keys = Object.keys(row);
    return _.union(acc, keys);
  }, []);
};

function useLogRows(fileName: string) {
  const [logData, setLogData] = useState<{ [index: string]: string }[]>([]);
  const logColumns = useMemo(() => getColumns(logData), [logData]);
  useEffect(() => {
    async function getLogs() {
      readRemoteFile<string[]>(
        `${
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/abc-analyzer"
            : "https://wooogler.github.io/abc-analyzer"
        }/logs/${fileName}`,
        {
          worker: true,
          complete: function (results) {
            const logColumns = [
              "timestamp",
              "datumType",
              "type",
              "name",
              "packageName",
              "currentKey",
              "timeTaken",
              "isPosted",
              "messageBox",
              "presentation",
              "_id",
            ];
            const logRaws = results.data;
            const logRows = getlogRows(logRaws).map((item) =>
              _.pick(item, logColumns)
            );
            // const logColumns = logRows.reduce<string[]>((acc, row) => {
            //   const keys = Object.keys(row);
            //   return _.union(acc, keys);
            // }, []);

            const res = logColumns.reduce(
              (ac, a) => ({ ...ac, [a]: "empty" }),
              {}
            );
            const logs = logRows.map((item) => Object.assign({}, res, item));
            setLogData(logs);
          },
          download: true,
        }
      );
    }
    getLogs();
  }, [fileName]);

  return { logData, logColumns };
}

export default useLogRows;
