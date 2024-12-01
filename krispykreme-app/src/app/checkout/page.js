'use client';
import * as React from 'react';
import { Button, Box, TextField, Typography, Container } from '@mui/material';
import Header from '../components/Header';  
import Footer from '../components/Footer';  

import '../styles/Checkout.css';
import '../styles/Style.css';


export default function Checkout() {
  //cart items
  const cartItems = [

  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const email = data.get('email');
    const address = data.get('address');

    const orderDetails = {
      name,
      email,
      address,
      items: cartItems,
      totalPrice,
    };
  };

  return (
    <>
      {/* Header */}
      <Header />

      {/* Checkout Container */}
      <Container maxWidth="md" sx={{ paddingTop: '20px' }}>
        <Box className="checkout-container">
          <Typography variant="h4" className="checkout-title">
            Checkout
          </Typography>

          {/* Cart Items List */}
          <Box className="checkout-cart-items">
            {cartItems.map((item, index) => (
              <Box
                key={index}
                className="checkout-cart-item"
              >
                <Typography>{item.name}</Typography>
                <Typography>{formatPrice(item.price)}</Typography>
              </Box>
            ))}
          </Box>

          {/* Total Price */}
          <Box className="checkout-total">
            <Typography variant="h6">
              Total: {formatPrice(totalPrice)}
            </Typography>
          </Box>

          {/* Form to Collect User Info */}
          <Box component="form" onSubmit={handleSubmit} className="checkout-form">
            <TextField
              required
              fullWidth
              label="Full Name"
              name="name"
              className="MuiTextField-root"
            />
            <TextField
              required
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              className="MuiTextField-root"
            />
            <TextField
              required
              fullWidth
              label="Shipping Address"
              name="address"
              className="MuiTextField-root"
            />

            {/* Checkout Button */}
            <Box className="checkout-button-container">
              <Button
                type="submit"
                variant="contained"
                className="checkout-button"
              >
                Complete Checkout
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
}
