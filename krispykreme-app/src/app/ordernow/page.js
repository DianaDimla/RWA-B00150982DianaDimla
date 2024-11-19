'use client';
import * as React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Style.css';

import Image from 'next/image';
import glazed from '../images/glazed.png';
import chocoglazed from '../images/chocoglazed.png';
import strawsprinkle from '../images/strawsprinkle.png';
import boston from '../images/boston.png';
import cinnamon from '../images/cinnamon.png';

export default function DonutList() {

  const donuts = [
    {
      id: 1,
      name: 'Original Glazed',
      description: 'The classic donut with a sweet glaze.',
      price: '$1.99',
      image: glazed, 
    },
    {
      id: 2,
      name: 'Chocolate Iced Glazed',
      description: 'Glazed donut dipped in chocolate icing.',
      price: '$2.49',
      image: chocoglazed,
    },
    {
      id: 3,
      name: 'Strawberry Sprinkle',
      description: 'Strawberry icing with colorful sprinkles.',
      price: '$2.99',
      image: strawsprinkle,
    },
    {
      id: 4,
      name: 'Boston Cream',
      description: 'Filled with custard and chocolate icing.',
      price: '$2.99',
      image: boston,
    },
    {
      id: 5,
      name: 'Cinnamon Sugar',
      description: 'Coated with cinnamon sugar.',
      price: '$1.99',
      image: cinnamon,
    },
  ];

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
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
          Our Delicious Donuts
        </Typography>

        {/* Donut Grid */}
        <Grid container spacing={4}>
          {donuts.map((donut) => (
            <Grid item xs={12} sm={6} md={4} key={donut.id}>
              <Card
                sx={{
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                {/* Donut Image */}
                <CardMedia
                  component="div"
                  height="200"
                  sx={{
                    objectFit: 'cover',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    src={donut.image}
                    alt={donut.name}
                    width={200}
                    height={200}
                    objectFit="cover"
                    priority
                  />
                </CardMedia>

                {/* Donut Info */}
                <CardContent sx={{ padding: '20px' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: '8px',
                      fontFamily: '"Roboto", sans-serif',
                    }}
                  >
                    {donut.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#555',
                      fontSize: '14px',
                      marginBottom: '10px',
                      lineHeight: 1.6,
                    }}
                  >
                    {donut.description}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: '600',
                      color: 'black',
                      marginBottom: '20px',
                    }}
                  >
                    {donut.price}
                  </Typography>
                  {/* Add to Cart Button */}
                  <Button
                    variant="contained"
                    sx={{
                      width: '100%',
                      backgroundColor: '#01411c',
                      color: '#fff',
                      padding: '12px 0',
                      textTransform: 'none',
                      borderRadius: '50px',
                      '&:hover': {
                        backgroundColor: '#D52B1E',
                      },
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
}
