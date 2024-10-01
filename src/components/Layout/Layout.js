// src/components/Layout/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet from react-router-dom
import Header from '../Header/header'; // Import the Header component

const Layout = () => {
  return (
    <>
      <Header /> {/* Header will appear on all pages */}
      <main>
        <Outlet /> {/* This renders the matched child route */}
      </main>
    </>
  );
};

export default Layout;
