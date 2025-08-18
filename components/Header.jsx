"use client";

import { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const renderLinks = () => {
    if (!user) {
      return (
        <>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/auth/signup">Signup</Link></li>
          <li><Link href="/auth/login">Login</Link></li>
        </>
      );
    }

    switch (user.role) {
      case "teacher":
        return (
          <>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/teacher/sessions">My Sessions</Link></li>
            <li><Link href="/profile">Profile</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        );
      case "student":
        return (
          <>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/student/attendance">My Attendance</Link></li>
            <li><Link href="/profile">Profile</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        );
      case "principle":
        return (
          <>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/principle/reports">Reports</Link></li>
            <li><Link href="/profile">Profile</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="text-2xl font-bold text-blue-600">MarkMe</Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium">
          {renderLinks()}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Popup Menu */}
      {menuOpen && (
        <div className="fixed top-16 right-4 w-64 bg-white border border-gray-200 shadow-lg rounded-lg z-50 animate-slide-in">
          <ul className="flex flex-col space-y-3 p-4 text-lg font-medium">
            {renderLinks()}
          </ul>
        </div>
      )}
    </header>
  );
}
