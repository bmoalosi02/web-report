import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { mockData2022, mockData2023, mockData2024 } from "./__mocks/mockHistory"; // Make sure this path is correct

export const TableComponent = ({ selectedYear, fromDate, toDate }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let filteredData = [];

    // Get the correct mock data based on the selected year
    switch (selectedYear) {
      case 2022:
        filteredData = mockData2022;
        break;
      case 2023:
        filteredData = mockData2023;
        break;
      case 2024:
        filteredData = mockData2024;
        break;
      default:
        filteredData = [];
    }

    // Filter data by date range if both fromDate and toDate are selected
    if (fromDate && toDate) {
      const from = new Date(fromDate).getTime();
      const to = new Date(toDate).getTime();

      filteredData = filteredData.map(entry => {
        const filteredEntry = { ...entry };
        Object.keys(filteredEntry).forEach(key => {
          if (new Date(`${key} ${selectedYear}`).getTime() < from || new Date(`${key} ${selectedYear}`).getTime() > to) {
            filteredEntry[key] = null;
          }
        });
        return filteredEntry;
      });
    }

    setData(filteredData);
  }, [selectedYear, fromDate, toDate]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Code</TableCell>
            <TableCell>Description</TableCell>
            {Object.keys(data[0] || {}).filter(key => key !== 'id' && key !== 'productCode' && key !== 'description').map(week => (
              <TableCell key={week}>{week}</TableCell>
            ))}
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.productCode}</TableCell>
              <TableCell>{row.description}</TableCell>
              {Object.keys(row).filter(key => key !== 'id' && key !== 'productCode' && key !== 'description').map(week => (
                <TableCell key={week}>{row[week]}</TableCell>
              ))}
              <TableCell>{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
