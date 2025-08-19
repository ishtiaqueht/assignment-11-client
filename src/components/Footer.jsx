import React from "react";
import { NavLink } from "react-router";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaPhoneAlt, FaTelegram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white py-4 mt-4">
  <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
    {/* Left side - Branding */}
    <div>
      <h2 className="text-2xl font-bold">AthleticClub</h2>
      <p className="mt-3 text-sm text-gray-200">
        Connecting athletes and fans through events, bookings, and management.
      </p>
    </div>

    {/* Center - Quick Links */}
    <div>
      <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
      <ul className="space-y-2 text-gray-200">
        <li>
          <NavLink to="/" className="hover:text-orange-400 transition-colors">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/make-event" className="hover:text-orange-400 transition-colors">
            Create Event
          </NavLink>
        </li>
        <li>
          <NavLink to="/myBookings" className="hover:text-orange-400 transition-colors">
            My Bookings
          </NavLink>
        </li>
        <li>
          <NavLink to="/manageEvents" className="hover:text-orange-400 transition-colors">
            Manage Events
          </NavLink>
        </li>
      </ul>
    </div>

    {/* Right side - Social + Contact */}
    <div>
      <h3 className="text-lg font-semibold mb-3">Stay Connected</h3>
       <div className="flex gap-4 text-lg mb-5">
              <a
                href="https://www.facebook.com/ishtiaque.hossaintanbin.1"
                className="p-2 rounded-full bg-base-content hover:bg-blue-600 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://t.me/Ishtiaque_HT"
                className="p-2 rounded-full bg-base-content hover:bg-sky-400 transition"
              >
                <FaTelegram />
              </a>
              <a
                href="https://github.com/"
                className="p-2 rounded-full bg-base-content hover:bg-gray-700 transition"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/ishtiaqueht/"
                className="p-2 rounded-full bg-base-content hover:bg-blue-500 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
      <p className="text-gray-200 text-sm flex items-center gap-2"><MdEmail/> ishtiaqueht@gmail.com</p>
      <p className="text-gray-200 text-sm flex items-center gap-2"><FaPhoneAlt /> +880 1787 127080</p>
    </div>
  </div>

  {/* Bottom copyright */}
  <div className="border-t border-blue-500 mt-8 pt-4 text-center text-gray-200 text-sm">
    © {new Date().getFullYear()} AthleticClub. All Rights Reserved.
  </div>
</footer>

  );
};

export default Footer;
