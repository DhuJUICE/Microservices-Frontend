import { Box, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async () => {
    try {
      const res = await fetch('http://127.0.0.1:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        setError(data.error || 'Login failed');
        setToken(null);
        return;
      }

      alert("Successfully Logged In");

      setToken(data.token);
      setError(null);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('username', data.username);
      localStorage.setItem('userId', data.userId);

      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const userName = localStorage.getItem("username");
      const userId = localStorage.getItem("userId");

      // Redirect user based on role
      if (role === "bank_supervisor") {
        navigate("/supervisor");
      } else {
        navigate("/atm");
      }

    } catch (err) {
      setError('Error connecting to server');
    }
  };

  return (
    <Box sx={{ height: '90vh', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          height: '60%',
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
        <Box sx={{ fontWeight: 'bold', marginBottom: 1 }}>LOGIN</Box>

        <TextField
          label="Username"
          variant="outlined"
          size="small"
          sx={{ width: '200px', marginBottom: 1 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          size="small"
          sx={{ width: '200px', marginBottom: 1 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleLogin}>
          LOGIN
        </Button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {token && <p style={{ color: 'green' }}>Token saved!</p>}
      </Box>
    </Box>
  );
};

export default Home;
