import {
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from '@mui/material';
  import React, { useState } from 'react';
  
  const ManagerPage = () => {
    const [accounts, setAccounts] = useState([
      {
        username: 'john_doe',
        accountNumber: '1234567890',
        bankName: 'Global Bank',
        bank_balance: 500,
      },
      {
        username: 'jane_smith',
        accountNumber: '0987654321',
        bankName: 'TechBank',
        bank_balance: 2000,
      },
      {
        username: 'alex_jones',
        accountNumber: '1122334455',
        bankName: 'Trust Bank',
        bank_balance: 1500,
      },
    ]);
  
    const [selectedUser, setSelectedUser] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [updatedBalance, setUpdatedBalance] = useState('');
    const [updatedUsername, setUpdatedUsername] = useState('');
    const [updatedBankName, setUpdatedBankName] = useState('');
  
    const handleSelectUser = (e) => {
      const username = e.target.value;
      setSelectedUser(username);
      const user = accounts.find((account) => account.username === username);
      setUserDetails(user);
      setUpdatedUsername(user.username);
      setUpdatedBankName(user.bankName);
      setUpdatedBalance(user.bank_balance.toString());
    };
  
    const handleUpdateDetails = () => {
      if (!updatedBalance || !updatedUsername || !updatedBankName) {
        alert('Please fill in all fields');
        return;
      }
  
      const updatedUser = {
        ...userDetails,
        username: updatedUsername,
        bankName: updatedBankName,
        bank_balance: parseFloat(updatedBalance),
      };
  
      const updatedAccounts = accounts.map((account) =>
        account.accountNumber === userDetails.accountNumber ? updatedUser : account
      );
  
      setAccounts(updatedAccounts);
      setUserDetails(updatedUser);
      setSelectedUser(updatedUsername);
      alert('User details updated successfully');
    };
  
    return (
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* User Management */}
        <Box
          sx={{
            height: '50%',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '100px',
            paddingTop: '20px',
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Manager-Page USER MANAGEMENT
          </Typography>
  
          {/* User Selection */}
          <Box sx={{ mb: 2 }}>
            <FormControl sx={{ width: 200 }}>
              <InputLabel>User</InputLabel>
              <Select value={selectedUser} label="User" onChange={handleSelectUser}>
                {accounts.map((account) => (
                  <MenuItem key={account.accountNumber} value={account.username}>
                    {account.username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
  
          {/* User Details */}
          {userDetails && (
            <Box sx={{ mb: 2 }}>
              <Typography>
                <strong>Username:</strong> {userDetails.username}
              </Typography>
              <Typography>
                <strong>Account Number:</strong> {userDetails.accountNumber}
              </Typography>
              <Typography>
                <strong>Bank Name:</strong> {userDetails.bankName}
              </Typography>
              <Typography>
                <strong>Balance:</strong> ${userDetails.bank_balance}
              </Typography>
            </Box>
          )}
  
          {/* Edit User Details */}
          {userDetails && (
            <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
              <TextField
                label="New Username"
                value={updatedUsername}
                onChange={(e) => setUpdatedUsername(e.target.value)}
              />
              <TextField
                label="New Bank Name"
                value={updatedBankName}
                onChange={(e) => setUpdatedBankName(e.target.value)}
              />
              <TextField
                label="New Balance"
                type="number"
                value={updatedBalance}
                onChange={(e) => setUpdatedBalance(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={handleUpdateDetails}>
                Update Details
              </Button>
            </Box>
          )}
        </Box>
  
        {/* Finance Management */}
        <Box
          sx={{
            height: '50%',
            backgroundColor: '#d0e0ff',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 100px',
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            FINANCE MANAGEMENT
          </Typography>
  
          {/* Display all user accounts in a table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Username</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Account Number</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Bank Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Balance</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.accountNumber}>
                    <TableCell>{account.username}</TableCell>
                    <TableCell>{account.accountNumber}</TableCell>
                    <TableCell>{account.bankName}</TableCell>
                    <TableCell>R{account.bank_balance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  };
  
  export default ManagerPage;
  