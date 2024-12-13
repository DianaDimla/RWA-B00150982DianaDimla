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
import { useRouter } from 'next/navigation'; // Using Next.js Router for navigation

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';
import '../styles/Style.css';

export default function SignUp() {
  const [accType, setAccType] = useState('customer'); // Default account type
  const [error, setError] = useState(null); // Error message state
  const [loading, setLoading] = useState(false); // Loading state for API call
  const router = useRouter(); // Use Next.js router for redirecting

  // Handle account type change
  const handleAccountTypeChange = (event) => setAccType(event.target.value);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear previous errors
    setError(null);

    // Get form data
    const data = new FormData(event.currentTarget);
    let firstName = data.get('firstName').trim();
    let email = data.get('email').trim();
    let pass = data.get('pass').trim();
    let accType = data.get('accType');

    // Input validation
    if (!firstName || !email || !pass || !accType) {
      setError('All fields are required.');
      return;
    }

    if (firstName.length > 20 || email.length > 50 || pass.length > 20) {
      setError('Input exceeds maximum allowed length.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    await runDBCallAsync(`/api/signup?firstName=${firstName}&email=${email}&pass=${pass}&accType=${accType}`);
    setLoading(false);
  };

  // Async function to handle the signup API call
  async function runDBCallAsync(url) {
    try {
      const res = await fetch(url); // Fetch data from API
      const data = await res.json(); // Parse JSON response

      if (res.ok) {
        console.log("Signup successful:", data);

        // Redirect to login page
        router.push('/login');
      } else {
        setError(data.error || 'Signup failed. Please try again.'); // Show error message
      }
    } catch (error) {
      console.error('Error during signup call:', error);
      setError('An error occurred during signup.'); // Handle fetch error
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
            <Button type="submit" fullWidth variant="contained" className="login-button" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
