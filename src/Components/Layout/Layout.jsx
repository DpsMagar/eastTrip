import React from "react";
import "./Layout.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { Scrollbar } from "react-scrollbars-custom";

const Layout = () => {
  return (
    <div className="layout-container">
      <NavBar />
      
      <div className="scrollbar-wrapper">
        <Scrollbar style={{ width: "100%", height: "calc(90vh - 120px)" }}>
          <main className="main-content">
            <Outlet />
          </main>
        </Scrollbar>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;