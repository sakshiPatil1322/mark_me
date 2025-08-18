"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ import router
import api from "@/lib/axios";

export default function RegisterPage() {
  const router = useRouter(); // ✅ initialize router

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    rollNumber: "",
    standard: "",
    division: "",
    secretKey: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/auth/signup`, formData);
      setMessage(res.data.message);

      if (res.data.message === "User registered successfully.") {
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "student",
          rollNumber: "",
          standard: "",
          division: "",
          secretKey: "",
        }); // ✅ clear fields

        router.push("/auth/login"); // ✅ redirect to login page
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed.");
      setFormData({
        ...formData,
        password: "",
        secretKey: formData.role !== "student" ? "" : formData.secretKey,
      }); // optional: clear only sensitive fields
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-4"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Register
        </h2>

        {/* Common Fields */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-lg text-gray-900 placeholder-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

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

        {/* Role Select */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="principle">Principle</option>
        </select>

        {/* Student Fields */}
        {formData.role === "student" && (
          <>
            <input
              type="text"
              name="standard"
              placeholder="Standard (e.g. 10)"
              value={formData.standard}
              onChange={handleChange}
              className="w-full border border-gray-400 p-3 rounded-lg text-gray-900 placeholder-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="text"
              name="division"
              placeholder="Division"
              value={formData.division}
              onChange={handleChange}
              className="w-full border border-gray-400 p-3 rounded-lg text-gray-900 placeholder-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="text"
              name="rollNumber"
              placeholder="Roll Number"
              value={formData.rollNumber}
              onChange={handleChange}
              className="w-full border border-gray-400 p-3 rounded-lg text-gray-900 placeholder-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </>
        )}

        {/* Teacher & Principle Fields */}
        {(formData.role === "teacher" || formData.role === "principle") && (
          <input
            type="text"
            name="secretKey"
            placeholder="Secret Key"
            value={formData.secretKey}
            onChange={handleChange}
            className="w-full border border-gray-400 p-3 rounded-lg text-gray-900 placeholder-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition"
        >
          Register
        </button>

        {message &&
          (message === "User registered successfully." ? (
            <p className="text-center text-sm font-medium text-green-500">
              {message}
            </p>
          ) : (
            <p className="text-center text-sm font-medium text-red-500">
              {message}
            </p>
          ))}
      </form>
    </div>
  );
}
