'use client';
import * as React from 'react';
import { useState } from 'react';
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
  const [accountType, setAccountType] = useState('customer'); // Default account type

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let name = data.get('name');
    let email = data.get('email');
    let pass = data.get('pass');
    let confirmPass = data.get('confirmPass');

    if (pass !== confirmPass) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('/api/newregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          pass,
          accountType,
        }),
      });

      const result = await response.json();

      if (response.status === 200) {
        alert('Sign-up successful! Redirecting...');
        window.location.href = '/login';
      } else {
        alert(result.message || 'Sign-up failed.');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content Container */}
      <Container maxWidth="sm" sx={{ paddingTop: '20px', paddingBottom: '20px' }}>
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

            {/* Name Input */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              InputLabelProps={{
                style: { color: '#66CCFF' },
              }}
              className="login-textfield"
            />

            {/* Email Input */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              autoComplete="new-password"
              InputLabelProps={{
                style: { color: '#66CCFF' },
              }}
              className="login-textfield"
            />

            {/* Confirm Password Input */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPass"
              label="Confirm Password"
              type="password"
              id="confirmPass"
              autoComplete="new-password"
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
