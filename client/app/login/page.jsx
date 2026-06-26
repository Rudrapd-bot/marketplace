"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { loginUser, getProfile } from "../services/authService";
import { useAuth } from "../context/authContext";

export default function LoginPage() {
  const router = useRouter();

  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Login API
      const res = await loginUser(formData);

      // Save JWT
      localStorage.setItem("token", res.data.token);

      // Load logged-in user
      const profile = await getProfile();

      setUser(profile.data.user);

      alert("Login Successful!");

      // Redirect
      router.push("/dashboard");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Login Failed"
      );

    } finally {
      setLoading(false);
    }
  };

return (

  <div className="min-h-screen flex">

{/* Left Side */}
<div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-700 via-blue-700 to-cyan-600 items-center justify-center p-12">

  <div className="text-white max-w-md">
    <h1 className="text-6xl font-extrabold mb-6">
      ProjectHub
    </h1>

    <p className="text-xl text-blue-100 leading-8">
      Showcase your projects, connect with developers,
      and build your professional portfolio in one place.
    </p>

    <div className="mt-12 flex gap-4">
      <div className="bg-white/20 backdrop-blur-md p-5 rounded-2xl">
        <h3 className="font-bold text-3xl">500+</h3>
        <p>Projects Shared</p>
      </div>

      <div className="bg-white/20 backdrop-blur-md p-5 rounded-2xl">
        <h3 className="font-bold text-3xl">1K+</h3>
        <p>Developers</p>
      </div>
    </div>
  </div>

</div>

{/* Right Side */}
<div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-100 px-4">

  <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

    <div className="text-center mb-8">

      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
        P
      </div>

      <h2 className="text-4xl font-bold mt-5 text-gray-800">
        Welcome Back
      </h2>

      <p className="text-gray-500 mt-2">
        Login to continue
      </p>

    </div>

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-2xl font-semibold text-lg shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-sm text-gray-500">OR</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Google Login */}
      <button
        type="button"
        onClick={() => {
          window.location.href =
            "https://marketplace-7xwt.onrender.com/api/auth/google";
        }}
        className="w-full border border-slate-300 bg-white py-3 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-sm"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />

        <span className="font-medium text-gray-700">
          Continue with Google
        </span>
      </button>

    </form>

    <p className="text-center mt-8 text-gray-600">
      Don't have an account?

      <Link
        href="/register"
        className="text-blue-600 font-semibold ml-2 hover:underline"
      >
        Register
      </Link>

    </p>

  </div>

</div>


  </div>
);
}
