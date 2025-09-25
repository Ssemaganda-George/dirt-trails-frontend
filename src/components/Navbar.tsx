import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { User } from "lucide-react"; // account icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const links = [
    { name: "Home", path: "/" },
    { name: "Tours", path: "/tours" },
    { name: "Bookings", path: "/bookings" },
    { name: "Conservation", path: "/conservation" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 font-bold text-green-700 text-xl">DirtTrails</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-gray-700 hover:text-green-700 font-medium ${
                  location.pathname === link.path ? "text-green-700" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Account Icon & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="p-2 rounded-full hover:bg-green-50 focus:outline-none"
              >
                <User className="w-6 h-6 text-green-700" />
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md py-2 z-50">
                  {user ? (
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setAccountOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-green-50"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setAccountOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-green-50"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 text-gray-700 hover:bg-green-50 ${
                location.pathname === link.path ? "bg-green-50 text-green-700" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Account Dropdown */}
          {user ? (
            <button
              onClick={logout}
              className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-green-50"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-green-50"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
