import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import axios from 'axios';

const Header = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Fetch all categories with subcategories
    axios.get(`${REACT_APP_BACKEND_URL}/api/categories/all-with-subcategories`)
      .then((res) => setMenuItems(res.data))
      .catch((err) => console.error('Error loading categories:', err));
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full fixed top-0 z-50 bg-gradient-to-b from-black to-transparent text-white">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div onClick={() => window.location.href = '/'}>
          <img src={logo} alt="GoaTourWala Logo" className="h-16 w-auto cursor-pointer" />
        </div>

        {/* Desktop Menu Items */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8 md:text-base font-medium border-b-2 border-red-500 pb-5 pt-2">
            {menuItems.map((cat) => (
              <li key={cat._id} className="relative group cursor-pointer">
                <span>{cat.name}</span>
                
                {/* Underline on hover */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
                
                {/* Subcategory Dropdown */}
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <ul className="absolute top-full left-0 bg-white text-black mt-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 z-50 min-w-max">
                    {cat.subcategories.map((sub) => (
                      <li key={sub._id}>
                        <Link
                          to={`/${cat.slug}/${sub.slug}`}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Side Navigation */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleMobileMenu}
          />
          
          {/* Side Navigation */}
          <nav className="fixed top-0 left-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 md:hidden">
            <div className="p-6">
              {/* Close Button */}
              <button
                onClick={toggleMobileMenu}
                className="mb-8 text-white focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Mobile Menu Items */}
              <ul className="space-y-4">
                {menuItems.map((cat) => (
                  <li key={cat._id} className="border-b border-gray-700 pb-4">
                    <div className="text-lg font-medium mb-2">{cat.name}</div>
                    
                    {/* Subcategories */}
                    {cat.subcategories && cat.subcategories.length > 0 && (
                      <ul className="ml-4 space-y-2">
                        {cat.subcategories.map((sub) => (
                          <li key={sub._id}>
                            <Link
                              to={`/${cat.slug}/${sub.slug}`}
                              className="block text-gray-300 hover:text-white transition-colors duration-200"
                              onClick={toggleMobileMenu}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;