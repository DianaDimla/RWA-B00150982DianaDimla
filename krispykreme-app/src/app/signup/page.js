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
  const [accType, setAccType] = useState('customer'); // Default account type
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(null); // Error state for handling error messages
  const url = 'mongodb+srv://root:myPassword123@cluster0.wqz8n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

  const handleAccountTypeChange = (event) => {
    setAccType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate user input
    if (!firstName || !email || !pass) {
      setError('All fields are required.');
      return;
    }

    try {
      // Use fetch API to call the backend API
      const response = await fetch(`/api/signup`, {
        method: 'POST', // Assuming POST method for registration
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: firstName, 
          email,
          pass,
          accountType: accType, 
        }),
      });

      if (response.ok) {
        alert('Sign-up successful! Redirecting...');
        window.location.href = '/login'; // Redirect user to login page after signup
      } else {
        const result = await response.json();
        setError(result.message || 'Sign-up failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setError('An error occurred. Please try again.');
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

            {/* Error message */}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            {/* First Name Input */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              InputLabelProps={{
                style: { color: '#66CCFF' },
              }}
              className="login-textfield"
            />

            {/* Account Type Dropdown */}
            <Select
              value={accType}
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
