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
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/events">Events</NavLink>
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
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
    <h1 className="hidden md:block text-xl md:text-2xl font-bold text-blue-600">
      AthleticClub
    </h1>
  </div>

  {/* Center Links (large devices only) */}
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-gray-700">
      {navLinks}
    </ul>
  </div>

  {/* Right side - User Auth */}
  <div className="navbar-end gap-3">
    {!user ? (
      <>
        <NavLink
          to="/login"
          className="btn bg-blue-600 hover:bg-blue-700 text-white btn-sm md:btn-md"
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className="btn bg-orange-900 hover:bg-orange-300 text-white btn-sm md:btn-md"
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
                src={user.photoURL || "https://i.ibb.co/2FsfXqM/default.png"}
                alt="profile"
              />
            </div>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
          >
            <li><NavLink to="/make-event" className="hover:text-orange-500">Create Event</NavLink></li>
            <li><NavLink to="/myBookings" className="hover:text-orange-500">My Bookings</NavLink></li>
            <li><NavLink to="/manageEvents" className="hover:text-orange-500">Manage Events</NavLink></li>
          </ul>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="btn bg-red-500 hover:bg-red-600 text-white btn-xs md:btn-sm"
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
 