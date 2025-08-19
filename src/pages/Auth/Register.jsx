import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";

const Register = () => {
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
    <div className="register flex justify-center items-center min-h-screen px-4">
  <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl py-6 rounded-2xl border border-blue-200">
    <h2 className="font-bold text-2xl text-center text-blue-600 mb-5">
      Register your account
    </h2>
    <form onSubmit={handleRegister} className="card-body px-6">
      <fieldset className="space-y-4">
        {/* Name */}
        <label className="block font-semibold text-gray-700">Name</label>
        <input
          name="name"
          type="text"
          className="input w-full rounded-xl border border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Name"
          required
        />
        {nameError && <p className="text-xs text-red-600">{nameError}</p>}

        {/* Photo URL */}
        <label className="block font-semibold text-gray-700">Photo URL</label>
        <input
          name="photo"
          type="text"
          className="input w-full rounded-xl border border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Photo URL"
          required
        />

        {/* Email */}
        <label className="block font-semibold text-gray-700">Email</label>
        <input
          name="email"
          type="email"
          autoComplete="off"
          className="input w-full rounded-xl border border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          required
        />

        {/* Password */}
        <label className="block font-semibold text-gray-700">Password</label>
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          className="input w-full rounded-xl border border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          required
        />
        {passwordError && <p className="text-xs text-red-600">{passwordError}</p>}

        {/* Register Button */}
        <button
          type="submit"
          className="btn mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl transition"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="font-semibold text-center pt-5 text-gray-700">
          Already have an account?{" "}
          <Link className="text-blue-600 hover:underline" to="/login">
            Login
          </Link>
        </p>

        <div className="divider text-blue-300">OR</div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="btn w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 transition"
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

export default Register;