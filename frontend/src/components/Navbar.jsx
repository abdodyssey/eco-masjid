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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Disable scroll saat menu terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // Tutup menu saat pindah halaman
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6">
            {navItems.map((item, key) => (
              <Link
                key={key}
                to={item.path}
                className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          {!isOpen && (
            <button onClick={toggleMenu} className="md:hidden text-emerald-800">
              <Menu size={24} />
            </button>
          )}
        </nav>
      </header>

      {/* Overlay Layer */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={toggleMenu} />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 p-6 shadow-lg transform transition-transform duration-300 ease-in-out ${
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
        </nav>
      </div>
    </>
  );
};

export default Navbar;
