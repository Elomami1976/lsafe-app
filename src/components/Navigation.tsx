import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const LSaveLogo = '/LSave4.png';

const navItems = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/about', label: 'About', icon: 'ℹ️' },
  { to: '/faq', label: 'FAQ', icon: '❓' },
  { to: '/contact', label: 'Contact', icon: '✉️' },
  { to: '/privacy', label: 'Privacy', icon: '🔒' },
  { to: '/terms', label: 'Terms', icon: '📄' },
];

const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200 transition-colors duration-200">
      <div className="container mx-auto flex items-center justify-between p-4">
        <NavLink to="/" className="flex items-center space-x-2">
          <img src={LSaveLogo} alt="LSafe Logo" className="h-10 w-10" />
          <span className="font-bold text-2xl text-gray-800">LSafe</span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-4">
          <ul className="hidden md:flex space-x-1 text-sm items-center">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                      isActive
                        ? 'bg-blue-100 text-blue-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <span>{item.icon}</span> {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <ul className="flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-6 py-3 text-base transition flex items-center gap-3 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                    }`
                  }
                >
                  <span>{item.icon}</span> {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
