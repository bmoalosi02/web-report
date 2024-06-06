import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box, Stack, styled } from "@mui/system";

export const DatePicker = ({
  setToDate,
  setFromDate,
  toDate,
  fromDate
}) => {
  const StyledDateCalendar = styled(DateCalendar)({
    flexGrow: 1,
    padding: '16px',
    borderRadius: '24px', // Rounded corners for the content area
    marginLeft: '-16px', // Push content area in from the edges
    backgroundColor: '#ffffff', // Content area background color
  });

  const toDateOnChanged = (value) => {
    setToDate(value);
  };

  return (
    <Box sx={{}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction="row">
          <StyledDateCalendar value={fromDate} onChange={(value) => { setFromDate(value); }} />
          <StyledDateCalendar value={toDate} onChange={toDateOnChanged} />
        </Stack>
      </LocalizationProvider>
    </Box>
  );
};
