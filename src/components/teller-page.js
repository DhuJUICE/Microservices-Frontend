import {
    Box, TextField, Button, Typography
  } from '@mui/material';
  import React, { useState, useEffect } from 'react';
  
  // Function to generate a random 10-digit account number
  const generateRandomAccountNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };
  
  const TellerPage = () => {
    // Dummy account data
    const dummyAccounts = [
      {
        username: 'john_doe',
        password: 'password123',
        accountNumber: '1234567890',
        bankName: 'Global Bank',
        bank_balance: 500,
      },
      {
        username: 'jane_smith',
        password: 'mypassword456',
        accountNumber: '0987654321',
        bankName: 'TechBank',
        bank_balance: 2000,
      },
      {
        username: 'alex_jones',
        password: 'securepass789',
        accountNumber: '1122334455',
        bankName: 'Trust Bank',
        bank_balance: 1500,
      },
    ];
  
    const [accounts, setAccounts] = useState([]);
    const [formData, setFormData] = useState({
      username: '',
      password: '',
      bankName: '',
    });
  
    const handleChange = (e) => {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const handleCreateAccount = () => {
      if (!formData.username || !formData.password || !formData.bankName) {
        alert('Please fill all fields');
        return;
      }
  
      // Generate a random account number
      const accountNumber = generateRandomAccountNumber();
  
      const newAccount = {
        ...formData,
        accountNumber,
        bank_balance: 0,
      };
  
      setAccounts(prev => [...prev, newAccount]);
      setFormData({ username: '', password: '', bankName: '' });
    };
  
    // Set dummy accounts on mount
    useEffect(() => {
      setAccounts(dummyAccounts);
    }, []);
  
    return (
      <Box sx={{ height: '80vh', display: 'flex', flexDirection: 'column', p: 4 }}>
        {/* CREATE BANK ACCOUNT */}
        <Box
          sx={{
            mb: 4,
            backgroundColor: '#f0f0f0',
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>Create New Bank Account</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              label="Bank Name"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" onClick={handleCreateAccount}>
              Create Account
            </Button>
          </Box>
        </Box>
  
        {/* VIEW BANK ACCOUNTS */}
        <Box
          sx={{
            backgroundColor: '#d0e0ff',
            p: 3,
            borderRadius: 2,
            flex: 1,
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" gutterBottom>All Bank Accounts</Typography>
          {accounts.length === 0 ? (
            <Typography>No accounts created yet.</Typography>
          ) : (
            accounts.map((acc, index) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  p: 2,
                  border: '1px solid #aaa',
                  borderRadius: 1,
                  backgroundColor: '#fff',
                }}
              >
                <Typography><strong>Username:</strong> {acc.username}</Typography>
                <Typography><strong>Account Number:</strong> {acc.accountNumber}</Typography>
                <Typography><strong>Bank Name:</strong> {acc.bankName}</Typography>
                <Typography><strong>Balance:</strong> R{acc.bank_balance}</Typography>
              </Box>
            ))
          )}
        </Box>
      </Box>
    );
  };
  
  export default TellerPage;
  