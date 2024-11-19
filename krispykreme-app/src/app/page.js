'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';  
import './styles/Homepage.css';
import Header from './components/Header';  
import Footer from './components/Footer';  
import logo from './images/logo.png';
import homepage from './images/homepage.png';

import './styles/Style.css';

export default function Homepage() {
  return (
    <>
      <Header />
      
      <div className="homepage-container">
        <div className="homepage-content">
          <div className="image-container">
              <Image 
                src={homepage} alt="homepage" />
            </div>

          {/* Right section with buttons */}
          <div className="homepage-right">
            <Link href="/signup">
              <button className="button">Join the Community</button>
            </Link>
            <Link href="/ordernow">
              <button className="button">ORDER NOW</button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
