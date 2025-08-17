"use client";
import { useState } from "react";
import api from "@/lib/axios";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/auth/login`, formData);
      setMessage(res.data.message);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-4"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-lg text-gray-900 placeholder-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-lg text-gray-900 placeholder-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition"
        >
          Login
        </button>

        {message && (message === "Login successful" ? (
          <p className="text-center text-sm font-medium text-green-500">{message}</p>
        ) : (
          <p className="text-center text-sm font-medium text-red-500">{message}</p>
        ))}
      </form>
    </div>
  );
}
