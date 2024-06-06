import {React, useEffect, useState} from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, Box, Checkbox, TextField, Tooltip, Menu, MenuItem as MUIMenuItem } from '@mui/material';
import { HelpOutline as HelpOutlineIcon } from '@mui/icons-material';
import { StockTable } from './stockTable';
import { mockBranches } from './__mocks/mockBranches'
import { mockCustomers } from './__mocks/mockCustomers'
import { mockLabelTypes } from './__mocks/mockLabelTypes'
import { BranchService } from '../../services/branchService';
import { useSelector } from 'react-redux';
import { LabelTypeService } from '../../services/labelService';
import { CustomerService } from '../../services/customerService';
import { padding, width } from '@mui/system';
import Paper from '@mui/material/Card';

export const ReportsPage = () => {
  const accessToken = useSelector((state) => state.accessToken);

  const currentDate = new Date().toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const [selectedBranch, setSelectedBranch] = useState('');
  const [branches, setBranches] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [customers, setCustomers] = useState([]);

  const [selectedlabelType, setSelectedLabelType] = useState('');
  const [labelTypes, setLabelTypes] = useState([]);

  const [isFastMovingLabelSelected, setIsFastMovingLabelSelected] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const loadBranches = async () => {
      const branches = await BranchService.getAllBranches(accessToken);

      setBranches(branches);
    }

    const loadLabels = async () => {
      const labels = await LabelTypeService.getAllLabelTypes(accessToken);

      setLabelTypes(labels);
    }

    const loadCustomers = async () => {
      const customers = await CustomerService.getAllCustomers(accessToken);
      
      setCustomers(customers);
    }

    loadBranches();
    loadCustomers();
    loadLabels();

  }, [])


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div sx={{ justifyContent: 'center', padding: '85px' }}>
      <Paper elevation={0} sx={{ padding: 4 }}>
        {/* <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}> */}
          <Typography variant="h4" gutterBottom>
            Sequential Labels
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Last Updated {currentDate}
          </Typography>
          <Box position="fixed" top="0" right="0"> {/* Position the icon container in the top right corner */}
            <Tooltip title="Options" arrow>
              <HelpOutlineIcon onClick={handleClick} style={{ cursor: 'pointer' }} />
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Typography variant="subtitle2" gutterBottom style={{ padding: '8px', fontWeight: 'bold' }}>
                Tooltips
              </Typography>
              <MUIMenuItem onClick={handleClose}>Head Office Stock</MUIMenuItem>
              <MUIMenuItem onClick={handleClose}>Stock in Transit</MUIMenuItem>
              <MUIMenuItem onClick={handleClose}>Branch Stock</MUIMenuItem>
              <MUIMenuItem onClick={handleClose}>Fast Moving Labels</MUIMenuItem>
            </Menu>
          </Box>
          <Box display="flex" alignItems="center">
            <FormControl style={{ margin: '8px', minWidth: '120px' }}>
              <InputLabel id="branch-label">Branch</InputLabel>
              <Select labelId="branch-label" id="branch-select">
                {branches.map((branch) => (
                  <MenuItem key={branch.branchId} value={branch.name}>{branch.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={{ margin: '8px', minWidth: '120px' }}>
              <InputLabel id="customer-label">Customer</InputLabel>
              <Select labelId="customer-label" id="customer-select">
                {customers.map((customer) => (
                  <MenuItem key={customer.customerId} value={customer.name}>{customer.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={{ margin: '8px', minWidth: '120px' }}>
              <InputLabel id="label-type-label">Label Type</InputLabel>
              <Select labelId="label-type-label" id="label-type-select">
                {labelTypes.map((label) => (
                  <MenuItem key={label.labelId} value={label.name}>{label.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
              <Checkbox id="fast-moving-labels-checkbox" />
              <Typography variant="body1">Fast Moving Labels</Typography>
              <TextField
                id="search"
                label="Search"
                variant="outlined"
                size="small"
                style={{ marginLeft: '8px' }}
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2, width: '100%' }}>
            {/* Additional content can be added here */}
          </Box>
          {/* <Paper sx={{overflowX: 'auto' , mt: 4,  padding: 2 }}> */}
            <Box sx={{ mt: 2,  overflowX: 'auto' }}>
              <StockTable />
            </Box>
          {/* </Paper> */}
        {/* </CardContent> */}
      </Paper>
    </div>
  );
};