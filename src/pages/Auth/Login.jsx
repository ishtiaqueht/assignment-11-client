import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
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
    <div className="login flex justify-center items-center min-h-screen bg-[#FFFDF6] px-4">
      <div className="card bg-[#FAF6E9] w-full max-w-sm shrink-0 shadow-2xl py-5 rounded-2xl border border-[#DDEB9D]">
        <h2 className="font-semibold text-2xl text-center text-[#556B2F] mb-4">
          Login your account
        </h2>
        <form onSubmit={handleLogin} className="card-body px-6">
          <fieldset className="space-y-4">
            <label className="block font-semibold text-[#556B2F]">Email</label>
            <input
              name="email"
              type="email"
              autoComplete="off"
              className="input w-full rounded-xl border border-[#A0C878] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A0C878]"
              placeholder="Email"
              required
            />

            <label className="block font-semibold text-[#556B2F]">
              Password
            </label>
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              className="input w-full rounded-xl border border-[#A0C878] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A0C878]"
              placeholder="Password"
              required
            />

            <a
              onClick={() => {
                const email = prompt("Enter your email to reset password:");
                if (email) {
                  resetPassword(email)
                    .then(() => toast.success("Password reset email sent!"))
                    .catch((err) => toast.error(err.message));
                }
              }}
              className="link link-hover cursor-pointer text-[#699447]"
            >
              Forgot password?
            </a>

            {error && <p className="text-red-600 text-xs">{error}</p>}

            <button
              type="submit"
              className="btn mt-4 w-full bg-gradient-to-r from-[#A0C878] to-[#899c5f] hover:from-[#899c5f] hover:to-[#A0C878] text-white font-semibold rounded-xl transition"
            >
              Login
            </button>

            <p className="font-semibold text-center pt-5 text-[#556B2F]">
              Don’t Have An Account?{" "}
              <Link className="text-[#A0C878] hover:underline" to="/register">
                Register
              </Link>
            </p>

            <div className="divider text-[#A0C878]">OR</div>

            <button
              onClick={handleGoogleLogin}
              className="btn w-full bg-[#A0C878] text-white rounded-xl flex items-center justify-center gap-2 hover:bg-[#899c5f] transition"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;