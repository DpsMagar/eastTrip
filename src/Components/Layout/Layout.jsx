import React from "react";
import "./Layout.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { Scrollbar } from "react-scrollbars-custom"; // Import Scrollbar
import image from "../../Assest/wallpaperflare.com_wallpaper.jpg"

const Layout = () => {
  return (
    
    <div className="layout-container">
      
      <NavBar />

      {/* Custom Scrollbar for Main Content */}
      <Scrollbar style={{ width: "100%", height: "100vh" }}>
        <main className="main-content">
          <Outlet />
        </main>
      </Scrollbar>

      <Footer />
    </div>
  );
};

export default Layout;