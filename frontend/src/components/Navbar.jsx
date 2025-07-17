import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaMosque } from "react-icons/fa";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Masjid", path: "/masjid" },
  { label: "Artikel", path: "/artikel" },
  { label: "Kalkulator", path: "/kalkulator" },
  { label: "Event", path: "/event" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Sembunyikan navbar jika sedang di halaman admin
  const isAdminPage = location.pathname.startsWith("/admin");
  if (isAdminPage) return null;

  return (
    <>
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 md:px-10 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl md:text-2xl font-extrabold text-emerald-800 flex items-center gap-2"
          >
            <FaMosque className="text-emerald-700" />
            EcoMasjid
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, key) => (
              <Link
                key={key}
                to={item.path}
                className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="ml-4 text-sm font-semibold text-emerald-700 border border-emerald-600 px-3 py-1.5 rounded hover:bg-emerald-700 hover:text-white transition"
            >
              Login Admin
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-emerald-800"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 p-6 shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="text-xl font-bold text-emerald-800 flex items-center gap-2"
          >
            <FaMosque />
            EcoMasjid
          </Link>
          <button onClick={toggleMenu}>
            <X className="text-gray-600" />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-sm text-gray-700 hover:text-emerald-700"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/admin/login"
            className="text-sm text-emerald-700 font-semibold border border-emerald-600 px-3 py-1.5 rounded hover:bg-emerald-700 hover:text-white transition mt-4"
          >
            Login Admin
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
