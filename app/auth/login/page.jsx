"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", formData);
      login(res.data.user, res.data.token); // update context
      setFormData({ email: "", password: "" });
      router.push("/"); // go home, header updates automatically
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-4">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Login</h2>

        <input
          type="email" name="email" placeholder="Email"
          value={formData.email} onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="password" name="password" placeholder="Password"
          value={formData.password} onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">Login</button>

        {message && <p className="text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
}
