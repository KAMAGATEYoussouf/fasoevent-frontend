import React from "react";
import Header from "../../components/Header"; // Ton Header existant
import Footer from "../../components/Footer"; // Ton Footer existant
import { Outlet } from "react-router-dom";

const CommonLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default CommonLayout;