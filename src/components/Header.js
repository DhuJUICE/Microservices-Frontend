// Header.jsx
import { Box } from '@mui/material';
import React from 'react';

const Header = () => {
  return (
    <Box
      sx={{
   
        backgroundColor: 'green',
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
        Secure Banking
      </h1>
    </Box>
  );
};

export default Header;
