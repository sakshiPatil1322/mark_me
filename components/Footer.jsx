// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 shadow-inner mt-10">
      <div className="container mx-auto text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Bluverse. All rights reserved.
      </div>
    </footer>
  );
}
