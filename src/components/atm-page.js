import {
  Box,
  TextField,
  Button,
  Typography
} from '@mui/material';
import React, { useState, useEffect } from 'react';

const AtmPage = () => {
  const [bankBalance, setBankBalance] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [username, setUsername] = useState('');
  const minWithdraw = 20;
  const minDeposit = 10;

  useEffect(() => {
    const fetchBankBalance = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const storedUsername = localStorage.getItem('username'); // Assuming username is stored in localStorage

      if (!token || !userId) {
        alert("User not logged in or missing token/userId.");
        return;
      }

      // Set the username in the state
      if (storedUsername) {
        setUsername(storedUsername);
      } else {
        setUsername('Guest'); // Fallback if username is not available
      }

      try {
        const response = await fetch(`http://127.0.0.1:3000/atm/transaction/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch balance");
        }

        const data = await response.json();
        console.log("Bank data:", data);  // Log the full response data to debug

        // Assuming the response only contains the bankBalance
        const balance = data?.bankBalance || 0;
        if (!isNaN(balance)) {
          setBankBalance(balance);
        } else {
          setBankBalance(0);
          console.warn("Invalid or missing bankBalance in response");
        }
      } catch (error) {
        console.error("Error fetching bank balance:", error);
        alert("Could not fetch bank balance.");
        setBankBalance(0);
      }
    };

    fetchBankBalance();
  }, []);

  const updateBankBalance = async (updatedBalance) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      alert("User not logged in or missing token/userId.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:3000/atm/transaction/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bankBalance: updatedBalance }),
      });

      if (!response.ok) {
        throw new Error("Failed to update balance");
      }

      console.log("Bank balance updated successfully");
    } catch (error) {
      console.error("Error updating bank balance:", error);
      alert("Could not update bank balance.");
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount) {
      alert('Please enter an amount to withdraw.');
      return;
    }

    if (amount < minWithdraw) {
      alert(`Can only withdraw a minimum of R${minWithdraw}`);
      return;
    }

    if (amount > bankBalance) {
      alert('Insufficient funds.');
      return;
    }

    const updatedBalance = bankBalance - amount;
    setBankBalance(updatedBalance);
    alert(`Withdrew R${amount.toFixed(2)}`);
    setWithdrawAmount('');
    updateBankBalance(updatedBalance); // Send updated balance
  };

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (!amount) {
      alert('Please enter an amount to deposit.');
      return;
    }

    if (amount < minDeposit) {
      alert(`Can only deposit a minimum of R${minDeposit}`);
      return;
    }

    const updatedBalance = bankBalance + amount;
    setBankBalance(updatedBalance);
    alert(`Deposited R${amount.toFixed(2)}`);
    setDepositAmount('');
    updateBankBalance(updatedBalance); // Send updated balance
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        ATM Page - User Management
      </Typography>

      {/* Display Username */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Welcome, {username}!
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
        <Typography sx={{ fontWeight: 'bold' }}>
          Bank Balance: {bankBalance !== null ? `R${bankBalance.toFixed(2)}` : 'Loading...'}
        </Typography>

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
