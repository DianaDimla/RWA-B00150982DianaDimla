'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Style.css';

export default function ManagerDashboard() {
  const [orderStats, setOrderStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchOrderStats();
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ marginTop: '30px', marginBottom: '50px' }}>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          sx={{
            fontWeight: 'bold',
            marginBottom: '40px',
            color: '#222',
            fontFamily: '"Roboto", sans-serif',
          }}
        >
          Manager Dashboard
        </Typography>

        {/* Display loading or error message */}
        {loading && <Typography variant="h6">Loading order statistics...</Typography>}
        {error && <Typography variant="h6" color="error">{error}</Typography>}

        {/* Show Order Stats if available */}
        {orderStats && (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    Total Orders
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {orderStats.totalOrders}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    Total Sales
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    ${orderStats.totalCost.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
      <Footer />
    </>
  );
}
