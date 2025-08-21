import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { NavLink } from "react-router";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out"))
      .catch((err) => toast.error(err));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg font-medium transition-all duration-300 
       ${
         isActive
           ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md scale-105"
           : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600"
       }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg font-medium transition-all duration-300 
       ${
         isActive
           ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md scale-105"
           : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600"
       }`
          }
        >
          Events
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-md px-6 sticky top-0 z-50">
      {/* Left side - Logo */}
      <div className="navbar-start">
        {/* Small device menu button */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden text-gray-700">
            {/* Hamburger Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          {/* Dropdown menu (small device) */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <h1
          className="hidden md:block text-2xl md:text-3xl font-extrabold 
             bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 
             text-transparent bg-clip-text drop-shadow-lg tracking-wide"
        >
          Athletic<span className="text-pink-500">Club</span>
        </h1>
      </div>

      {/* Center Links (large devices only) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-gray-700">{navLinks}</ul>
      </div>

      {/* Right side - User Auth */}
      <div className="navbar-end gap-3">
        {!user ? (
          <>
            <NavLink
              to="/login"
              className="px-5 py-2 md:px-6 md:py-2.5 rounded-xl font-semibold 
             bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600
             hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-700
             text-white shadow-lg transition duration-300 transform hover:scale-105"
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="px-5 py-2 md:px-6 md:py-2.5 rounded-xl font-semibold 
             bg-gradient-to-r from-pink-500 via-red-500 to-orange-500
             hover:from-pink-600 hover:via-red-600 hover:to-orange-600
             text-white shadow-lg transition duration-300 transform hover:scale-105"
            >
              Register
            </NavLink>
          </>
        ) : (
          <div className="flex items-center gap-3">
            {/* Profile dropdown */}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                data-tip={user.displayName}
              >
                <div className="w-8 md:w-10 rounded-full ring ring-blue-500 ring-offset-2">
                  <img
                    src={
                      user.photoURL || "https://i.ibb.co/2FsfXqM/default.png"
                    }
                    alt="profile"
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
              >
                <li>
                  <NavLink to="/make-event" className="hover:text-orange-500">
                    Create Event
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/myBookings" className="hover:text-orange-500">
                    My Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/manageEvents" className="hover:text-orange-500">
                    Manage Events
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="px-5 py-2 md:px-6 md:py-2.5 rounded-xl font-semibold 
             bg-gradient-to-r from-red-500 via-pink-500 to-red-700
             hover:from-red-600 hover:via-pink-600 hover:to-red-800
             text-white shadow-lg transition duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
