import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const usernames = ['Sam1', 'John2', 'Lisa3', 'Dave4'];
const labelTypes = ['Head Office', 'Branch', 'Administrator'];

export function UserManagementPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLabelChange = (event) => {
    setSelectedLabels(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // Add your search logic here
    console.log('Search button clicked');
  };

  const handleApply = () => {
    // Add your apply logic here
    console.log('Apply button clicked');
  };

  const handleCancel = () => {
    // Add your cancel logic here
    console.log('Cancel button clicked');
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        User Management
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="username-label">Username</InputLabel>
        <Select
          labelId="username-label"
          value={username}
          onChange={handleUsernameChange}
        >
          {usernames.map((username) => (
            <MenuItem key={username} value={username}>
              {username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="labels-label">Labels</InputLabel>
        <Select
          labelId="labels-label"
          multiple
          value={selectedLabels}
          onChange={handleLabelChange}
          input={<OutlinedInput label="Roles" />}
        >
          {labelTypes.map((label) => (
            <MenuItem key={label} value={label}>
              {label}
            </MenuItem>
          ))}
        </Select>
        {selectedLabels.map((label) => (
          <Chip key={label} label={label} sx={{ mr: 1, mb: 1 }} />
        ))}
      </FormControl>
      <TextField
        fullWidth
        label="Search"
        value={searchTerm}
        onChange={handleSearchTermChange}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="contained" onClick={handleApply}>
          Apply
        </Button>
        <Button variant="contained" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};