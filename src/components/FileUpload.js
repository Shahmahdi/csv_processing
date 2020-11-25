import React, { useState } from 'react';
import { Button, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import Papa from "papaparse";

export const FileUpload = () => {
  const [csvFile, setCsvFile] = useState(undefined);
  const [showError, setShowError] = useState(false);
  const [formatedData, setFormatedData] = useState([]);

  const handleFileInput = (e) => {
    setCsvFile(undefined);
    setFormatedData([]);
    if (e.target.files[0] && e.target.files[0].type !== "text/csv") {
      setShowError(true);
      setCsvFile(undefined);
      return;
    }
    setCsvFile(e.target.files[0]);
  };

  const importCSV = () => {
    if (csvFile) {
      Papa.parse(csvFile, {
        dynamicTyping: true,
        beforeFirstChunk: () => {
          setFormatedData([]);
        },
        complete: () => {
          setFormatedData(formatedData);
        },
        step: row => {
          formatedData.push(row.data);
        },
        // header: true, // If true then data format will be different
      });
    }
  };

  return (
    <div>
      <h2>Import CSV File!</h2>
      <input
        className='csv-input'
        type='file'
        name='file'
        placeholder={null}
        onChange={handleFileInput}
        accept='.csv'
      />
      <Button variant='contained' onClick={importCSV}>
        {" "}
        Upload now!
      </Button>
      {showError && <Typography variant="body2" gutterBottom color="error">
        The file type must be in csv format.
      </Typography>}
      {formatedData.length > 0 ?
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {formatedData.map((header, index) => (
                  index === 0 ? header.map((data, i) => <TableCell key={`header_${i}`}>{data}</TableCell>)
                  : undefined
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {formatedData.map((data, index) => (
                <TableRow key={index}>
                  {index > 0 ? data.map((colData, i) => <TableCell key={`data_${i}`}>{colData}</TableCell>)
                    : undefined}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      : undefined}
    </div>
  );
}
