import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white ">
        <Navbar />
        {/* Main content */}
        <main className="flex-grow container mx-auto px-4 py-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
