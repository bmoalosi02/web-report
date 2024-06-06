import React from 'react';
import { Chip, Box } from '@mui/material';

export const YearToggle = ({ selectedYear, setSelectedYear }) => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 2, currentYear - 1, currentYear];

  const handleChipClick = (year) => {
    setSelectedYear(year);
  };

  return (
    <Box sx={{ backgroundColor: "secondary", display: 'flex', gap: 1 }}>
      {years.map((year) => (
        <Chip
          key={year}
          label={year}
          clickable
          color={year === selectedYear ? 'secondary' : 'default'}
          onClick={() => handleChipClick(year)}
        />
      ))}
    </Box>
  );
};
