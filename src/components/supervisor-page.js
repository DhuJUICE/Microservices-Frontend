import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

const getRandomAccountNumber = () =>
  Math.floor(1000000000 + Math.random() * 9000000000).toString();

const SupervisorPage = () => {
  const [usersData, setUsersData] = useState([]); // array of financial records with nested user
  const [selectedId, setSelectedId] = useState('');
  const [newUserData, setNewUserData] = useState({
    username: '',
    password: '',
    role: 'bank_client', // default role, can adjust if needed
    bankName: '',
    bankAccountNumber: '',
    bankBalance: 0,
  });
  const [section, setSection] = useState(''); // '', 'create', 'list', 'update'

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const token = localStorage.getItem('token'); // adjust if needed

        const response = await fetch('http://127.0.0.1:3000/bank-account/details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        if (Array.isArray(result.data)) {
          setUsersData(result.data);
        } else {
          console.warn('Unexpected data format:', result.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsersData();
  }, []);

  const handleChange = (e) => {
    setNewUserData({
      ...newUserData,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = () => {
    const { username, password, bankName } = newUserData;
    if (!username || !password || !bankName) {
      alert('Please fill username, password, and bank name');
      return;
    }
    // Check duplicate username
    const exists = usersData.some((u) => u.user.username === username);
    if (exists) {
      alert('Username already exists');
      return;
    }

    const newRecord = {
      id: Date.now(),
      user: {
        id: Date.now(),
        username: newUserData.username,
        password: newUserData.password,
        role: 'bank_client',
      },
      bankName: newUserData.bankName,
      bankAccountNumber: getRandomAccountNumber(),
      bankBalance: 0,
    };

    setUsersData([...usersData, newRecord]);
    setNewUserData({
      username: '',
      password: '',
      role: 'bank_client',
      bankName: '',
      bankAccountNumber: '',
      bankBalance: 0,
    });
  };

  const deleteUser = () => {
    if (!selectedId) return;
    setUsersData(usersData.filter((u) => u.id !== selectedId));
    setSelectedId('');
    setNewUserData({
      username: '',
      password: '',
      role: 'bank_client',
      bankName: '',
      bankAccountNumber: '',
      bankBalance: 0,
    });
  };

  const updateUser = () => {
    if (!selectedId) return;
    setUsersData(
      usersData.map((record) => {
        if (record.id === selectedId) {
          return {
            ...record,
            user: {
              ...record.user,
              username: newUserData.username,
              password: newUserData.password,
              role: record.user.role,
            },
            bankName: newUserData.bankName,
            bankAccountNumber: record.bankAccountNumber,
            bankBalance: record.bankBalance,
          };
        }
        return record;
      })
    );
    setSelectedId('');
    setNewUserData({
      username: '',
      password: '',
      role: 'bank_client',
      bankName: '',
      bankAccountNumber: '',
      bankBalance: 0,
    });
  };

  const handleSelectChange = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    const record = usersData.find((u) => u.id === id);
    if (record) {
      setNewUserData({
        username: record.user.username,
        password: record.user.password,
        role: record.user.role,
        bankName: record.bankName,
        bankAccountNumber: record.bankAccountNumber,
        bankBalance: record.bankBalance,
      });
    } else {
      setNewUserData({
        username: '',
        password: '',
        role: 'bank_client',
        bankName: '',
        bankAccountNumber: '',
        bankBalance: 0,
      });
    }
  };

  // When changing section, clear selection and form data
  const handleSectionChange = (e) => {
    setSection(e.target.value);
    setSelectedId('');
    setNewUserData({
      username: '',
      password: '',
      role: 'bank_client',
      bankName: '',
      bankAccountNumber: '',
      bankBalance: 0,
    });
  };

  return (
    <Box sx={{ p: '20px 100px', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Bank Account Management
      </Typography>

      {/* Radio buttons for section selection */}
      <FormControl component="fieldset" sx={{ mb: 5}}>
        <RadioGroup
          row
          value={section}
          onChange={handleSectionChange}
          aria-label="section"
          name="section"
        >
          <FormControlLabel value="create" control={<Radio />} label="Create Bank Account" />
          <FormControlLabel value="list" control={<Radio />} label="See Bank Accounts" />
          <FormControlLabel value="update" control={<Radio />} label="Update/Delete Bank Account" />
        </RadioGroup>
      </FormControl>

      {/* Conditionally render based on selected section */}

      {section === 'create' && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" gutterBottom>
            CREATE NEW BANK ACCOUNT
          </Typography>
          <TextField
            label="Username"
            name="username"
            value={newUserData.username}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={newUserData.password}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Bank Name"
            name="bankName"
            value={newUserData.bankName}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={createUser} fullWidth>
            Create User
          </Button>
        </Box>
      )}

      {section === 'list' && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" gutterBottom>
            All Bank Accounts
          </Typography>
          <List>
            {usersData.map((record) => (
              <ListItem key={record.id} divider>
                <ListItemText
                  primary={`${record.user.username} (Role: ${record.user.role})`}
                  secondary={
                    <>
                      Password: {record.user.password} <br />
                      Bank Name: {record.bankName} <br />
                      Account Number: {record.bankAccountNumber} <br />
                      Balance: R{(record.bankBalance ?? 0).toFixed(2)}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {section === 'update' && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" gutterBottom>
            SELECT USER/CLIENT
          </Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>User</InputLabel>
            <Select value={selectedId} label="User" onChange={handleSelectChange}>
              {usersData.map((record) => (
                <MenuItem key={record.id} value={record.id}>
                  {record.user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedId && (
            <>
              <Typography variant="h6" gutterBottom>
                UPDATE BANK ACCOUNT
              </Typography>
              <TextField
                label="Username"
                name="username"
                value={newUserData.username}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={newUserData.password}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Bank Name"
                name="bankName"
                value={newUserData.bankName}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Bank Account Number"
                name="bankAccountNumber"
                value={newUserData.bankAccountNumber}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Balance"
                name="bankBalance"
                value={newUserData.bankBalance}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="warning" onClick={updateUser} fullWidth sx={{ mb: 2 }}>
                UPDATE BANK ACCOUNT
              </Button>
              <Button variant="contained" color="error" onClick={deleteUser} fullWidth>
                DELETE BANK ACCOUNT
              </Button>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SupervisorPage;
