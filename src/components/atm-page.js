import {
    Box,
    TextField,
    Button,
    Typography
  } from '@mui/material';
  import React, { useState } from 'react';
  
  const AtmPage = () => {
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const minWithdraw = 20;
    const minDeposit = 10;

    const handleWithdraw = () => {
      if (!withdrawAmount) {
        alert('Please enter an amount to withdraw.');
        return;
      }

      if (withdrawAmount < minWithdraw) {
        alert(`Can only withdraw amount minimum R${minWithdraw}`);
        return;
      }

      alert(`Withdrew R${withdrawAmount} from the account.`);
      setWithdrawAmount('');
    };
  
    const handleDeposit = () => {
      if (!depositAmount) {
        alert('Please enter an amount to deposit.');
        return;
      }

      if (depositAmount < minDeposit) {
        alert(`Can only deposit amount minimum R${minDeposit}`);
        return;
      }

      alert(`Deposited R${depositAmount} into the account.`);
      setDepositAmount('');
    };
  
    return (
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          ATM Page - User Management
        </Typography>
  
        <Box
          sx={{
            backgroundColor: '#f0f0f0',
            display: 'flex',
            flexDirection: 'column',
            padding: 3,
            borderRadius: 2,
            gap: 4,
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Bank Balance: R500 000</Typography>
  
          {/* Withdraw Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ width: '150px' }}>Withdraw:</Typography>
            <TextField
              label="Amount"
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              sx={{ width: 120 }}
              inputProps={{ min: 0 }}
            />
            <Button variant="contained" color="error" onClick={handleWithdraw}>
              Withdraw
            </Button>
          </Box>
  
          {/* Deposit Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ width: '150px' }}>Deposit:</Typography>
            <TextField
              label="Amount"
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              sx={{ width: 120 }}
              inputProps={{ min: 0 }}
            />
            <Button variant="contained" color="success" onClick={handleDeposit}>
              Deposit
            </Button>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default AtmPage;
  