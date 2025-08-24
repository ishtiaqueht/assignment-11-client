import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";
import useDynamicTitle from "../../hooks/useDynamicTitle";

const Register = () => {
  useDynamicTitle("Register | AthleticClub");
  const { createUser, setUser, updateUser, signInWithGoogle } =
    use(AuthContext);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    if (name.length < 5) {
      setNameError("Name should be more then 5 character");
      return;
    } else {
      setNameError("");
    }
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return;
    }

    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    //   setPasswordError("Password must contain at least one special character");
    //   return;
    // }

    setPasswordError("");
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        navigate(`${location.state ? location.state : "/"}`);
        setUser(user);
        toast.success(`${user.email} registered successfully!`);
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate("/");
          })
          .catch((error) => {
            setUser(user);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        // ..
      });
  };
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        navigate(`${location.state ? location.state : "/"}`);
        toast.success("Logged in Successfully");
      })
      .catch((err) => {
        // setError(err.message);
        toast.error(err);
      });
  };
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-white px-4">
      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-blue-100 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-blue-700">
          Register your account
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Name</label>
            <input
              name="name"
              type="text"
              className="mt-2 w-full rounded-xl border border-blue-200 px-4 py-3 text-sm shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              required
            />
            {nameError && <p className="text-xs font-medium text-red-600">{nameError}</p>}
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Photo URL</label>
            <input
              name="photo"
              type="text"
              className="mt-2 w-full rounded-xl border border-blue-200 px-4 py-3 text-sm shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter photo URL"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              autoComplete="off"
              className="mt-2 w-full rounded-xl border border-blue-200 px-4 py-3 text-sm shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              className="mt-2 w-full rounded-xl border border-blue-200 px-4 py-3 text-sm shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Create a password"
              required
            />
            {passwordError && <p className="text-xs font-medium text-red-600">{passwordError}</p>}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 px-6 py-3 font-semibold text-white shadow-md transition hover:from-blue-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="pt-4 text-center text-sm font-medium text-gray-700">
            Already have an account?{' '}
            <Link className="text-blue-600 hover:underline" to="/login">
              Login
            </Link>
          </p>

          {/* Divider */}
          <div className="relative my-6 flex items-center">
            <div className="h-px flex-1 bg-blue-200"></div>
            <span className="mx-4 text-xs font-semibold uppercase tracking-wider text-blue-400">OR</span>
            <div className="h-px flex-1 bg-blue-200"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-6 py-3 font-medium text-gray-700 shadow-sm transition hover:bg-blue-50 hover:text-blue-700"
          >
            <svg
              aria-label="Google logo"
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path fill="#fff" d="M0 0h512v512H0z"></path>
              <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
              <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
              <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
              <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
            </svg>
            Continue with Google
          </button>
        </form>
      </div>
    </div>

  );
};

export default Register;
