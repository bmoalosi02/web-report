import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Tooltip,
  Menu,
  MenuItem as MUIMenuItem,
} from "@mui/material";
import { HelpOutline as HelpOutlineIcon } from "@mui/icons-material";
import { BranchService } from "../../services/branchService";
import { useSelector } from "react-redux";
import { LabelTypeService } from "../../services/labelService";
import { CustomerService } from "../../services/customerService";
import { DatePicker } from "./datePicker";
import { YearToggle } from "./yearToggle";
import { TableComponent } from "./salesHistoryTable";
import Paper from "@mui/material/Card";

export const SalesHistoryPage = () => {
  const accessToken = useSelector((state) => state.accessToken);

  const currentDate = new Date().toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const [selectedBranch, setSelectedBranch] = useState("");
  const [branches, setBranches] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [customers, setCustomers] = useState([]);

  const [selectedLabelType, setSelectedLabelType] = useState("");
  const [labelTypes, setLabelTypes] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);

  const [datePickerAnchorEl, setDatePickerAnchorEl] = useState(null);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleCustomClick = (event) => {
    setDatePickerAnchorEl(event.currentTarget);
  };

  const handleCustomClose = () => {
    setDatePickerAnchorEl(null);
  };

  useEffect(() => {
    const loadBranches = async () => {
      const branches = await BranchService.getAllBranches(accessToken);
      setBranches(branches);
    };

    const loadLabels = async () => {
      const labels = await LabelTypeService.getAllLabelTypes(accessToken);
      setLabelTypes(labels);
    };

    const loadCustomers = async () => {
      const customers = await CustomerService.getAllCustomers(accessToken);
      setCustomers(customers);
    };

    loadBranches();
    loadCustomers();
    loadLabels();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", padding: "16px", boxSizing: "border-box" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Sales History
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Last Updated {currentDate}
        </Typography>
        <Box sx={{ position: "relative" }}>
          <Tooltip title="Options" arrow>
            <HelpOutlineIcon onClick={handleClick} style={{ cursor: "pointer" }} />
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Typography variant="subtitle2" gutterBottom style={{ padding: "8px", fontWeight: "bold" }}>
              Tooltips
            </Typography>
            <MUIMenuItem onClick={handleClose}>Head Office Stock</MUIMenuItem>
            <MUIMenuItem onClick={handleClose}>Stock in Transit</MUIMenuItem>
            <MUIMenuItem onClick={handleClose}>Branch Stock</MUIMenuItem>
            <MUIMenuItem onClick={handleClose}>Fast Moving Labels</MUIMenuItem>
          </Menu>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" mb={2}>
        <FormControl style={{ margin: "8px", minWidth: "120px" }}>
          <InputLabel id="branch-label">Branch</InputLabel>
          <Select labelId="branch-label" id="branch-select">
            {branches.map((branch) => (
              <MenuItem key={branch.branchId} value={branch.name}>
                {branch.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ margin: "8px", minWidth: "120px" }}>
          <InputLabel id="customer-label">Customer</InputLabel>
          <Select labelId="customer-label" id="customer-select">
            {customers.map((customer) => (
              <MenuItem key={customer.customerId} value={customer.name}>
                {customer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ margin: "8px", minWidth: "120px" }}>
          <InputLabel id="label-type-label">Label Type</InputLabel>
          <Select labelId="label-type-label" id="label-type-select">
            {labelTypes.map((label) => (
              <MenuItem key={label.labelId} value={label.name}>
                {label.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
          <Box sx={{ marginRight: "8px" }}>
            <YearToggle selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
          </Box>
          <Tooltip title="Options" arrow>
            <Button variant="contained" onClick={handleCustomClick}>
              Custom
            </Button>
          </Tooltip>
          <Menu
            anchorEl={datePickerAnchorEl}
            open={Boolean(datePickerAnchorEl)}
            onClose={handleCustomClose}
          >
            <DatePicker toDate={toDate} setToDate={setToDate} fromDate={fromDate} setFromDate={setFromDate} />
          </Menu>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Paper sx={{ overflowX: 'auto', flexGrow: 1 }}>
          <TableComponent selectedYear={selectedYear} fromDate={fromDate} toDate={toDate} />
        </Paper>
      </Box>
    </Box>
  );
};
