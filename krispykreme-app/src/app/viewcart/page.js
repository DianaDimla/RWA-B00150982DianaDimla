'use client';
import * as React from 'react';
import { Container, Box, Button } from '@mui/material';
import Link from 'next/link';
import Header from '../components/Header';  // Ensure correct path if needed
import Footer from '../components/Footer';  // Ensure correct path if needed

// Add Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Import your CSS file
import '../styles/Cart.css';
import '../styles/Style.css';

export default function Cart() {
  // Example data for products in the cart (You would typically fetch this from your database or context)
  const cartItems = [
    
  ];

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Handle the checkout process
    console.log('Proceeding to checkout...');
    // Redirect to a checkout page or API call to process order
  };

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content Container */}
      <Container maxWidth="lg" sx={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '70vh' }}>
          <Box
            sx={{
              padding: '20px',
              backgroundColor: '#01411c',
              borderRadius: 2,
              boxShadow: 3,
              width: '100%',
              maxWidth: 800,
              color: '#FFFFFF',
            }}
          >
            <h2 className="text-center">Your Cart</h2>

            {/* Cart Items List */}
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-details">
                      <span>{item.name}</span>
                      <span>{`$${item.price.toFixed(2)} x ${item.quantity}`}</span>
                      <span>{`$${(item.price * item.quantity).toFixed(2)}`}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Total */}
            <div className="cart-total">
              <h3>Total: ${calculateTotal()}</h3>
            </div>

            {/* Checkout Button */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleCheckout}
              sx={{
                backgroundColor: '#b51409',
                '&:hover': { backgroundColor: '#b3362d;' },
                color: '#1a1a1a',
                padding: '10px',
                marginTop: '20px',
              }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
}
