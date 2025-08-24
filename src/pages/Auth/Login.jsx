import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";
import useDynamicTitle from "../../hooks/useDynamicTitle";

const Login = () => {
   useDynamicTitle("Login | AthleticClub");
  const [error, setError] = useState("");
  const { signIn, signInWithGoogle, resetPassword } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        navigate(`${location.state ? location.state : "/"}`);
        toast.success(`${user.email} logged in successfully!`);
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
        toast.error(errorCode);
      });
  };
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        navigate(`${location.state ? location.state : "/"}`);
        toast.success("Logged in Successfully");
      })
      .catch((err) => {
        setError(err.message);
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
          Login to your account
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
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
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => {
                const email = prompt("Enter your email to reset password:");
                if (email) {
                  resetPassword(email)
                    .then(() => toast.success("Password reset email sent!"))
                    .catch((err) => toast.error(err.message));
                }
              }}
              className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              Forgot password?
            </button>
          </div>

          {/* Error message */}
          {error && <p className="text-xs font-medium text-red-600">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 px-6 py-3 font-semibold text-white shadow-md transition hover:from-blue-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>

          {/* Register link */}
          <p className="pt-4 text-center text-sm font-medium text-gray-700">
            Don’t have an account?{' '}
            <Link className="text-blue-600 hover:underline" to="/register">
              Register
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

export default Login;

