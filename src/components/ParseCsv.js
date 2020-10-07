import React, { useEffect, useState, useRef } from "react";
import { readRemoteFile } from "react-papaparse";
import SchoolTable from "./SchoolTable";
import { useForm } from "react-hook-form";

import "./ParseCsv.css";
export default function () {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const ref = useRef({
    defaultRow: 0,
  });

  useEffect(() => {
    async function getData() {
      readRemoteFile(
        "https://raw.githubusercontent.com/openbangalore/bangalore/master/bangalore/Education/Bangalore_schools.csv",
        {
          delimiter: "|",
          download: true,
          complete: (results) => {
            setColumns(results.data[0]);
            ref.current.defaultRow = results.data.slice(2, results.length);
            setRows(results.data.slice(2, results.length));
          },
        }
      );
    }
    getData();
  }, []); // [] means just do this once, after initial render
  // console.log(rows);

  return (
    <div className="container">
      <SchoolTable rowsProp={rows} columnsProp={columns} />
    </div>
  );
}
