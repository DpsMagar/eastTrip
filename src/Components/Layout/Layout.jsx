import React from 'react';
import "./Layout.css";
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom'; 

const Layout = () => {
  return (
    <div className="layout-container">
      <NavBar />
      
      <main className="main-content">
  
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;