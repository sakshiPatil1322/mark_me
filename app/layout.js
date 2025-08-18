import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Attendance Management",
  description: "Teacher-Student Attendance Tracking System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-gray-100 to-gray-300 text-gray-900`}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen container mx-auto">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
