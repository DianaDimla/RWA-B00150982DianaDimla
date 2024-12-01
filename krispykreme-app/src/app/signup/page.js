'use client';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from '../components/Header';
import Footer from '../components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';
import '../styles/Style.css';

export default function SignUp() {
  // State for account type and error message
  const [accType, setAccType] = useState('customer'); 
  const [error, setError] = useState(null); 

  // Handle account type change
  const handleAccountTypeChange = (event) => setAccType(event.target.value);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Get form data
    const data = new FormData(event.currentTarget);
    let firstName = data.get('firstName');
    let email = data.get('email');
    let pass = data.get('pass');
    let accType = data.get('accType');

    // Validate inputs
    if (!firstName || !email || !pass) {
      setError("All fields are required.");
      return;
    }

    setError(null); 

    // Call API
    runDBCallAsync(
      `/api/signup?firstName=${firstName}&email=${email}&pass=${pass}&accType=${accType}`
    );
  };

  // Make API call
  async function runDBCallAsync(url) {
      const res = await fetch(url);
      const data = await res.json();

      // Handle response
      if (data.data === "inserted") {
        window.location.href = '/login';
      } else {
        console.log("Signup failed");
      }
  }

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main content */}
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            className="login-container"
            sx={{
              padding: '20px',
              backgroundColor: '#1a1a1a',
              borderRadius: 2,
              boxShadow: 3,
              width: '100%',
              maxWidth: 400,
              color: '#FFFFFF',
            }}
          >
            <h2 className="text-center">Sign Up</h2>

            {/* Error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Input fields */}
            <TextField margin="normal" required fullWidth id="firstName" label="First Name" name="firstName" />
            <TextField margin="normal" required fullWidth id="email" label="Email" name="email" />
            <TextField margin="normal" required fullWidth name="pass" label="Password" type="password" id="pass" />

            {/* Account type select */}
            <Select
              name="accType"
              value={accType}
              onChange={handleAccountTypeChange}
              fullWidth
              displayEmpty
              sx={{ marginTop: '16px', marginBottom: '16px' }}
            >
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>

            {/* Submit button */}
            <Button type="submit" fullWidth variant="contained" className="login-button">
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
}
