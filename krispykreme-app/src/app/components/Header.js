import React from 'react';
import '../styles/Header.css';
import Image from 'next/image';
import logo from '../images/logo.png';  // Adjust the path if necessary
import Link from 'next/link'; // Import Next.js Link component
import { FaShoppingCart, FaSearch, } from 'react-icons/fa'; // Import cart icon

export default function Header() {
  return (
    <div>
      <header className="header">

        {/* Logo Section */}
        <div className="header__logo">
          <Image src={logo} alt="Logo" width={180} height={60}/>
        </div>
        
        {/* Search Bar Section */}
        <div className="header__search">
          <input className="search-input" type="text" placeholder="Search..." />
          <FaSearch className="search-icon" />
        </div>

        {/* Navigation Links */}
        <div className="header__nav">
        <Link href="/cart" className="cart-link">
            <FaShoppingCart className="cart-icon" />
          </Link>
          <Link href="/signup">Signup</Link>
          <Link href="/login">Login</Link>
        </div>
      </header>

      {/* Secondary Navigation Bar */}
      <nav className="secondary-nav">
        <ul className="secondary-nav__list">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/information">About us</Link></li>
          <li><Link href="/products">ORDER NOW</Link></li>
        </ul>
      </nav>
    </div>
  );
}
