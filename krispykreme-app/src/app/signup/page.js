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
  const [accType, setAccType] = useState('customer'); 
  const [error, setError] = useState(null); 
  const handleAccountTypeChange = (event) => setAccType(event.target.value);

  const handleSubmit = (event) => {
    console.log("Handling submit");
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let firstName = data.get('firstName');
    let email = data.get('email');
    let pass = data.get('pass');
    let accType = data.get('accType');

    // Input validation
    if (!firstName || !email || !pass) {
      setError("All fields are required.");
      return;
    }

    setError(null);

    console.log("Sent firstName:", firstName);
    console.log("Sent email:", email);
    console.log("Sent pass:", pass);
    console.log("Sent accType:", accType);

    // Call the database interaction function
    runDBCallAsync(
      `http://localhost:3000/api/signup?firstName=${firstName}&email=${email}&pass=${pass}&accType=${accType}`
    );
  };

  async function runDBCallAsync(url) {

      const res = await fetch(url);
      // Parse the response JSON
      const data = await res.json();

      // Handle the response
      if (data.data === "inserted") {
        console.log("Signup is valid!");
        window.location.href = '/login';
      } else {
        console.log("Signup not valid");
      }
  }

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
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

            {/* Error Message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* First Name Input */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="name"
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
            />

            {/* Account Type Dropdown */}
            <Select
              name="accType"
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
