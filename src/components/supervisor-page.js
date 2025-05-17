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
	const [updateUserData, setUpdateUserData] = useState({
		password: '',
		bankName: '',
	  });

  const [usersData, setUsersData] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [newUserData, setNewUserData] = useState({
    username: '',
    password: '',
    role: 'bank_client',
    bankName: '',
    bankAccountNumber: '',
    bankBalance: 0,
  });
  const [section, setSection] = useState('');

  const fetchUsersData = async () => {
	try {
	  const token = localStorage.getItem('token');
  
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

 	useEffect(() => {
		fetchUsersData();
	}, []);

  const handleChange = (e) => {
    setNewUserData({
      ...newUserData,
      [e.target.name]: e.target.value,
    });
  };

  const updateChange = (e) => {
    setUpdateUserData({
      ...updateUserData,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = async () => {
    const { username, password, bankName } = newUserData;

    if (!username || !password || !bankName) {
      alert('Please fill username, password, and bank name');
      return;
    }

    const exists = usersData.some((u) => u.user.username === username);
    if (exists) {
      alert('Username already exists');
      return;
    }

    const newBankAccountNumber = getRandomAccountNumber();

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://127.0.0.1:3000/bank-account/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          password,
          role: 'bank_client',
          bankName,
          bankAccountNumber: newBankAccountNumber,
          bankBalance: 0,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create bank account');
      }

      const result = await response.json();

      // Optionally add the new record locally for immediate UI feedback
      const newRecord = {
        id: Date.now(), // fallback ID for frontend rendering
        user: {
          id: Date.now(),
          username,
          password,
          role: 'bank_client',
        },
        bankName,
        bankAccountNumber: newBankAccountNumber,
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

      alert('Bank Account created successfully!');

	  fetchUsersData();
    } catch (error) {
      alert(error.message);
      console.error('Error creating user:', error);
      alert('An error occurred while creating the user');
    }
  };


  const deleteUser = async () => {
	if (!selectedId) return;
  
	const confirmed = window.confirm("Are you sure you want to delete this bank account?");
	if (!confirmed) return;
  
	try {
	  const token = localStorage.getItem('token');
  
	  const selectedRecord = usersData.find((u) => u.id === selectedId);
	  if (!selectedRecord) {
		alert('Selected record not found');
		return;
	  }
  
	  const response = await fetch('http://127.0.0.1:3000/bank-account/delete', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
		  bankAccountId: selectedId,
		  userId: selectedRecord.user.id,
		}),
	  });
  
	  if (!response.ok) {
		throw new Error('Failed to delete bank account');
	  }
  
	  alert('Bank account deleted successfully');
  
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
	  fetchUsersData();
	} catch (error) {
	  console.error('Error deleting bank account:', error);
	  alert('An error occurred while deleting the bank account');
	}
  };

  const updateUser = async () => {
    if (!selectedId) return;

    const record = usersData.find((r) => r.id === selectedId);
    if (!record) return;

	if (!updateUserData.password && !updateUserData.bankName) {
      alert('At least Password or BankName is required');
      return;
    }

	const requestBody = {
			userId: record.user.id,
			bankAccountId: selectedId,
			oldUsername: record.user.username,
			password: updateUserData.password,
			bankName: updateUserData.bankName,
			oldBankBalance: record.bankBalance,
			oldBankAccountNumber: record.bankAccountNumber,
			oldUser: record.user
	};	

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://127.0.0.1:3000/bank-account/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // assuming token is defined in scope
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        alert('Failed to update bank account');
        return;
      }

      const result = await response.json(); // optional: log result or notify user
      alert('Bank account updated successfully');

	  setUpdateUserData({
		password: '',
		bankName: '',
	  });

      // Update local state only after success
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

      // Reset form
      setSelectedId('');
      setNewUserData({
        username: '',
        password: '',
        role: 'bank_client',
        bankName: '',
        bankAccountNumber: '',
        bankBalance: 0,
      });
	  fetchUsersData();
    } catch (error) {
      console.error('Error updating user:', error);
    }

  };


  const handleSelectChange = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    const record = usersData.find((u) => u.id === id);
	setUpdateUserData({
		password: '',
		bankName: '',
	  });
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
      <Typography variant="h4" gutterBottom textAlign="center">
        Bank Account Management
      </Typography>

      <FormControl component="fieldset" sx={{ mb: 5 }}>
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

      {section === 'create' && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" gutterBottom>
            CREATE NEW BANK ACCOUNT
          </Typography>
          <TextField label="Username" name="username" value={newUserData.username} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Password" name="password" type="password" value={newUserData.password} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Bank Name" name="bankName" value={newUserData.bankName} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <Button variant="contained" onClick={createUser} fullWidth>
            CREATE BANK ACCOUNT
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
                  primary={`Client: ${record.user.username}`}
                  secondary={
                    <>
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
              
              <TextField label="Password" name="password" type="password" value={updateUserData.password} onChange={updateChange} fullWidth sx={{ mb: 2 }} />
              <TextField label="Bank Name" name="bankName" value={updateUserData.bankName} onChange={updateChange} fullWidth sx={{ mb: 2 }} />
              
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
