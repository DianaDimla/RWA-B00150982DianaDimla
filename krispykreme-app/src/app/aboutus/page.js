'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';  
import '../styles/Aboutus.css'; 
import Header from '../components/Header';  
import Footer from '../components/Footer';  
import about from '../images/about.png';


export default function About() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* About Us Main Content */}
      <div className="about-page">
        {/* Header Section */}
        <div className="about-header">
          <h1>Welcome to Krispy Kreme!</h1>
          <p>
            Since 1937, we’ve been serving up fresh, delicious, melt-in-your-mouth donuts and coffee. 
            It’s not just a treat; it’s an experience.
          </p>
        </div>

        {/* About Section */}
        <div className="about-content">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Krispy Kreme was born out of a passion for creating the world’s most iconic glazed donut. 
              From a small shop in Winston-Salem, North Carolina, our journey has been one of bringing joy 
              and smiles to millions of donut lovers worldwide.
            </p>
            <p>
              Whether it’s our Original Glazed® or our seasonally-inspired creations, every donut is made with 
              love and dedication. For us, it’s not just about selling donuts—it’s about creating moments of 
              happiness for our customers.
            </p>
          </div>
          <div className="about-image">
            <Image src={about} alt="Krispy Kreme donuts" width={200} height={300} />
          </div>
        </div>

        {/* Mission Section */}
        <div className="about-mission">
          <h2>Our Mission</h2>
          <p>
            At Krispy Kreme, we believe in making life sweeter, one donut at a time. We strive to deliver 
            joy to our customers, team members, and communities by crafting the finest donuts and coffee 
            while building meaningful connections.
          </p>
        </div>

        {/* Values Section */}
        <div className="about-values">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Quality:</strong> Committed to excellence in every donut and cup of coffee we serve.</li>
            <li><strong>Community:</strong> Bringing people together and supporting local initiatives.</li>
            <li><strong>Innovation:</strong> Continuously creating exciting flavors and experiences for our customers.</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="about-cta">
          <h3>Visit us and taste the magic!</h3>
          <p>
            Stop by one of our locations or order online to bring the joy of Krispy Kreme to you!
          </p>
          <Link href="/listings">
              <button className="button">ORDER NOW</button>
            </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
