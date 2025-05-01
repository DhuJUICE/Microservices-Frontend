import React, { useState } from 'react';
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
} from '@mui/material';

const getRandomAccountNumber = () =>
  Math.floor(1000000000 + Math.random() * 9000000000).toString();

const SupervisorPage = () => {
  const [users, setUsers] = useState([
    {
      username: 'john_doe',
      password: 'password123',
      bankName: 'Global Bank',
      bankAccountNumber: '1234567890',
      balance: 500,
    },
    {
      username: 'jane_smith',
      password: 'password456',
      bankName: 'TechBank',
      bankAccountNumber: '0987654321',
      balance: 2000,
    },
    {
      username: 'alex_jones',
      password: 'password789',
      bankName: 'Trust Bank',
      bankAccountNumber: '1122334455',
      balance: 1500,
    },
  ]);

  const [selectedUser, setSelectedUser] = useState('');
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    bankName: '',
    bankAccountNumber: '',
    balance: 0,
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const createUser = () => {
    if (!newUser.username || !newUser.password || !newUser.bankName) return;
    const userExists = users.some((u) => u.username === newUser.username);
    if (userExists) return alert('Username already exists.');
    const fullUser = {
      ...newUser,
      bankAccountNumber: getRandomAccountNumber(),
      balance: 0,
    };
    setUsers([...users, fullUser]);
    setNewUser({
      username: '',
      password: '',
      bankName: '',
      bankAccountNumber: '',
      balance: 0,
    });
  };

  const deleteUser = () => {
    setUsers(users.filter((u) => u.username !== selectedUser));
    setSelectedUser('');
  };

  const updateUser = () => {
    setUsers(
      users.map((u) =>
        u.username === selectedUser
          ? {
              ...u,
              ...newUser,
              bankAccountNumber: u.bankAccountNumber,
              balance: u.balance,
            }
          : u
      )
    );
    setNewUser({
      username: '',
      password: '',
      bankName: '',
      bankAccountNumber: '',
      balance: 0,
    });
    setSelectedUser('');
  };

  const selected = users.find((u) => u.username === selectedUser);

  return (
    <Box sx={{ p: '20px 100px', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <Typography variant="h5" gutterBottom>
        👤 Supervisor - User & Bank Account Management
      </Typography>

      {/* Create User */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <Typography fontWeight="bold">➕ CREATE USER</Typography>
        <TextField
          label="Username"
          name="username"
          value={newUser.username}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={newUser.password}
          onChange={handleChange}
        />
        <TextField
          label="Bank Name"
          name="bankName"
          value={newUser.bankName}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={createUser}>
          Create User
        </Button>
      </Box>

      {/* Select User */}
      <Box sx={{ mb: 4 }}>
        <Typography fontWeight="bold">📄 Select User</Typography>
        <FormControl sx={{ width: 200 }}>
          <InputLabel>User</InputLabel>
          <Select
            value={selectedUser}
            label="User"
            onChange={(e) => {
              setSelectedUser(e.target.value);
              const found = users.find((u) => u.username === e.target.value);
              setNewUser(
                found || {
                  username: '',
                  password: '',
                  bankName: '',
                  bankAccountNumber: '',
                  balance: 0,
                }
              );
            }}
          >
            {users.map((u) => (
              <MenuItem key={u.username} value={u.username}>
                {u.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Update User */}
      {selected && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
          <Typography fontWeight="bold">✏️ UPDATE USER</Typography>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleChange}
          />
          <TextField
            label="Bank Name"
            name="bankName"
            value={newUser.bankName}
            onChange={handleChange}
          />
          <Button variant="contained" color="warning" onClick={updateUser}>
            Update User
          </Button>
        </Box>
      )}

      {/* Delete User */}
      <Box sx={{ mb: 4 }}>
        <Typography fontWeight="bold">🗑️ DELETE USER</Typography>
        <Button
          variant="contained"
          color="error"
          disabled={!selectedUser}
          onClick={deleteUser}
        >
          Delete User
        </Button>
      </Box>

      {/* Display All Users */}
      <Box sx={{ backgroundColor: '#fff', p: 4 }}>
        <Typography variant="h6">📋 All Users & Bank Accounts</Typography>
        <List>
          {users.map((user) => (
            <ListItem key={user.username}>
              <ListItemText
                primary={`👤 ${user.username}`}
                secondary={
                  <>
                    🔐 Password: {user.password} <br />
                    🏦 Bank Name: {user.bankName} <br />
                    💳 Account Number: {user.bankAccountNumber} <br />
                    💰 Balance: R{user.balance.toFixed(2)}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SupervisorPage;
