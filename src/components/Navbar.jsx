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
    <div className="navbar bg-base-100 shadow-md px-6">
      {/* Left side - Logo */}
      <div className="navbar-start">
        <h1 className="text-2xl font-bold text-blue-600">
          AthleticClub
        </h1>
      </div>

      {/* Center Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* Right side - User Auth */}
      <div className="navbar-end gap-3">
        {!user ? (
          <>
            <NavLink to="/login" className="btn btn-primary">
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-primary">
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
                data-tip={user.email} // এখানে hover করলে email দেখাবে
              >
                <div className="w-10 rounded-full">
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
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <NavLink to="/make-event">Create Event</NavLink>
                </li>
                <li>
                  <NavLink to="/myBookings">My Bookings</NavLink>
                </li>
                <li>
                  <NavLink to="/manageEvents">Manage Events</NavLink>
                </li>
              </ul>
            </div>

            <button onClick={handleLogout} className="btn btn-error btn-sm">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
