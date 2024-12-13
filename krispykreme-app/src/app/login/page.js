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
import Link from 'next/link';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';
import '../styles/Style.css';

export default function Login() {
  const [accountType, setAccountType] = useState('customer'); // Default account type
  const [error, setError] = useState(null); // Error message state
  const [loading, setLoading] = useState(false); // Loading state for API call

  // Handle account type change
  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear previous errors
    setError(null);

    // Get email and password values from form
    const email = event.target.email.value.trim();
    const pass = event.target.pass.value.trim();

    // Input validation
    if (!email || !pass) {
      setError('Email and password cannot be blank.');
      return;
    }

    if (email.length > 30) {
      setError('Email cannot exceed 50 characters.');
      return;
    }

    if (pass.length > 20) {
      setError('Password cannot exceed 30 characters.');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Trigger API call
    setLoading(true);
    await runDBCallAsync(`/api/login?email=${email}&pass=${pass}&accType=${accountType}`);
    setLoading(false);
  };

  // Async function to handle the login API call
  async function runDBCallAsync(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        console.log('Login successful:', data);

        // Redirect based on user role
        if (data.user.role === 'customer') {
          window.location.href = '/ordernow';
        } else if (data.user.role === 'manager') {
          window.location.href = '/manager';
        }
      } else {
        setError(data.error || 'Invalid login credentials.');
      }
    } catch (error) {
      console.error('Error during login call:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  }

  return (
    <>
      <Header />
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
            <h2 className="text-center">Login</h2>

            {/* Email input */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputProps={{ maxLength: 30 }} // Limit input length to 50
              InputLabelProps={{ style: { color: '#66CCFF' } }}
              className="login-textfield"
            />

            {/* Password input */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="pass"
              label="Password"
              type="password"
              id="pass"
              autoComplete="current-password"
              inputProps={{ maxLength: 20 }} // Limit input length to 30
              InputLabelProps={{ style: { color: '#66CCFF' } }}
              className="login-textfield"
            />

            {/* Account type dropdown */}
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

            {/* Submit button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            {/* Display error message */}
            {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}

            {/* Link to signup */}
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <Link href="/signup" passHref>
                <Button variant="outlined" sx={{ marginTop: '10px', color: '#66CCFF' }}>
                  Don't have an account? Sign Up
                </Button>
              </Link>
            </div>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
