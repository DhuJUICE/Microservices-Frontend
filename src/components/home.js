import React from 'react';
import { Box, TextField, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* HEADER SECTION */}
      <Box
        sx={{
          height: '3%',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
          gap: 1,
          borderBottom: '1px solid #ccc',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>
          Juniër Herandien's Computer Security Microservices Project
        </h1>
      </Box>

      {/* Login SECTION */}
      <Box
        sx={{
          height: '10%',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
          gap: 1,
          borderBottom: '1px solid #ccc',
        }}
      >
        <Box sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          LOGIN
        </Box>
        
        <Box sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          <TextField
            label="Username"
            variant="outlined"
            size="small"
            sx={{ width: '200px' }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            size="small"
            sx={{ width: '200px' }}
          />
          <Button variant="contained">
            LOGIN
          </Button>
        </Box>
      </Box>


      {/* Top Half - User Management */}
      <Box
        sx={{
          height: '40%',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: '100px',
        }}
      >
        USER MANAGEMENT
        
        <Box
          sx={{
            flex: 1,
            borderBottom: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            fontWeight: 'bold',
          }}
        >
          CREATE USER
        </Box>
        <Box
          sx={{
            flex: 1,
            borderBottom: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            fontWeight: 'bold',
          }}
        >
          READ USER
          <FormControl sx={{ width: 200 }}>
            <InputLabel>User</InputLabel>
            <Select
              //value={selectedUser}
              label="User"
              //onChange={(e) => setSelectedUser(e.target.value)} //this links to an event function when the option in the dropdown is changed
            >
              <MenuItem value="user1">user1</MenuItem>
              <MenuItem value="user2">user2</MenuItem>
              <MenuItem value="user3">user3</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="error"
            //onClick={handleDelete}
            //disabled={!selectedUser}
          >
            READ USER
          </Button>
        </Box>
        <Box
          sx={{
            flex: 1,
            borderBottom: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            fontWeight: 'bold',
          }}
        >
          UPDATE USER
          <FormControl sx={{ width: 200 }}>
            <InputLabel>User</InputLabel>
            <Select
              //value={selectedUser}
              label="User"
              //onChange={(e) => setSelectedUser(e.target.value)} //this links to an event function when the option in the dropdown is changed
            >
              <MenuItem value="user1">user1</MenuItem>
              <MenuItem value="user2">user2</MenuItem>
              <MenuItem value="user3">user3</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="error"
            //onClick={handleDelete}
            //disabled={!selectedUser}
          >
            UPDATE USER
          </Button>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            fontWeight: 'bold',
          }}
        >
          DELETE USER
          <FormControl sx={{ width: 200 }}>
            <InputLabel>User</InputLabel>
            <Select
              //value={selectedUser}
              label="User"
              //onChange={(e) => setSelectedUser(e.target.value)} //this links to an event function when the option in the dropdown is changed
            >
              <MenuItem value="user1">user1</MenuItem>
              <MenuItem value="user2">user2</MenuItem>
              <MenuItem value="user3">user3</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="error"
            //onClick={handleDelete}
            //disabled={!selectedUser}
          >
            DELETE USER
          </Button>
        </Box>
      </Box>

      {/* Bottom Half - Finances Management */}
      <Box
        sx={{
          height: '40%',
          backgroundColor: '#d0e0ff',
          display: 'flex',
          flexDirection: 'column',
          paddingRight: '100px',
        }}
      >
        FINANCE MANAGEMENT
        <Box
          sx={{
            flex: 1,
            borderBottom: '1px solid #aaa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
            fontWeight: 'bold',
          }}
        >
          CREATE FINANCE
        </Box>
        <Box
          sx={{
            flex: 1,
            borderBottom: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
            fontWeight: 'bold',
          }}
        >
          READ FINANCE
          <FormControl sx={{ width: 200 }}>
            <InputLabel>User</InputLabel>
            <Select
              //value={selectedUser}
              label="User"
              //onChange={(e) => setSelectedUser(e.target.value)} //this links to an event function when the option in the dropdown is changed
            >
              <MenuItem value="user1">user1</MenuItem>
              <MenuItem value="user2">user2</MenuItem>
              <MenuItem value="user3">user3</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="error"
            //onClick={handleDelete}
            //disabled={!selectedUser}
          >
            READ FINANCE
          </Button>
        </Box>
        <Box
          sx={{
            flex: 1,
            borderBottom: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
            fontWeight: 'bold',
          }}
        >
          UPDATE FINANCE
          <FormControl sx={{ width: 200 }}>
            <InputLabel>User</InputLabel>
            <Select
              //value={selectedUser}
              label="User"
              //onChange={(e) => setSelectedUser(e.target.value)} //this links to an event function when the option in the dropdown is changed
            >
              <MenuItem value="user1">user1</MenuItem>
              <MenuItem value="user2">user2</MenuItem>
              <MenuItem value="user3">user3</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="error"
            //onClick={handleDelete}
            //disabled={!selectedUser}
          >
            UPDATE FINANCE
          </Button>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
            fontWeight: 'bold',
          }}
        >
          DELETE FINANCE
          <FormControl sx={{ width: 200 }}>
            <InputLabel>User</InputLabel>
            <Select
              //value={selectedUser}
              label="User"
              //onChange={(e) => setSelectedUser(e.target.value)} //this links to an event function when the option in the dropdown is changed
            >
              <MenuItem value="user1">user1</MenuItem>
              <MenuItem value="user2">user2</MenuItem>
              <MenuItem value="user3">user3</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="error"
            //onClick={handleDelete}
            //disabled={!selectedUser}
          >
            DELETE FINANCE
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
