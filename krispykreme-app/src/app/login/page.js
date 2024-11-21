'use client';
import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
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

export default function Login() {

  const [accountType, setAccountType] = useState('customer'); // Default to customer
  const [error, setError] = useState(null); // To display errors

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value; // Access email field directly
    const pass = event.target.pass.value;  // Access password field directly

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: pass,
          accountType,
        }),
      });

      const result = await response.json();

      if (response.status === 200) {
        console.log('Login successful!', result);

        // Redirect based on account type using next/router
        if (accountType === 'customer') {
          router.push('/ordernow'); // Redirect to order now page for customers
        } else if (accountType === 'manager') {
          router.push('/manager'); // Redirect to manager dashboard
        }
      } else {
        setError(result.message); // Show error message to the user
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login.');
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh',
          }}
        >
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
            <h2 className="text-center">Login</h2>

            {/* Email Input */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputLabelProps={{
                style: { color: '#66CCFF' },
              }}
              className="login-textfield"
            />

            {/* Password Input */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="pass"
              label="Password"
              type="password"
              id="pass"
              autoComplete="current-password"
              InputLabelProps={{
                style: { color: '#66CCFF' },
              }}
              className="login-textfield"
            />

            {/* Account Type Dropdown */}
            <Select
              value={accountType}
              onChange={handleAccountTypeChange}
              fullWidth
              displayEmpty
              className="login-select"
              sx={{
                marginTop: '16px',
                marginBottom: '16px',
                color: '#66CCFF',
                borderRadius: '5px',
              }}
            >
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="login-button"
            >
              Login
            </Button>

            {/* Error Message */}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
