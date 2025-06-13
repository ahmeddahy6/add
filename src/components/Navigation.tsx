import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showSpecificDropdown, setShowSpecificDropdown] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    // If not on home page, navigate to home first then scroll
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      }));

      const current = sections.find(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 bg-black/10 backdrop-blur-xl border border-white/5 rounded-3xl subtle-nav-glow">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold tracking-wider">
            AI<span className="text-blue-400">Studio</span>
          </div>

          <div className="hidden md:flex items-center space-x-8 relative">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {item.id === 'services' ? (
                  <div 
                    className="relative dropdown-persistent"
                    onMouseEnter={() => setShowServicesDropdown(true)}
                    onMouseLeave={() => setShowServicesDropdown(false)}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-light tracking-wide transition-all duration-300 rounded-lg ${
                        activeSection === item.id
                          ? 'text-blue-400 bg-blue-400/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Services Dropdown */}
                    <div className={`dropdown-menu absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden ${showServicesDropdown ? 'opacity-100 visible transform-none' : ''}`}>
                      <Link
                        to="/genservices"
                        className="block px-6 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                      >
                        General
                      </Link>
                      <div 
                        className="relative group"
                        onMouseEnter={() => setShowSpecificDropdown(true)}
                        onMouseLeave={() => setShowSpecificDropdown(false)}
                      >
                        <Link
                          to="/specservices"
                          className="w-full flex items-center justify-between px-6 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                        >
                          Specific Niche
                          <ChevronDown className="w-4 h-4" />
                        </Link>
                        <div className={`absolute left-full top-0 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl ml-2 transition-all duration-200 ${showSpecificDropdown ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                          <Link to="/specservices?niche=ecommerce" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">E-commerce</Link>
                          <Link to="/specservices?niche=marketing" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">Marketing</Link>
                          <Link to="/specservices?niche=sales" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">Sales</Link>
                          <Link to="/specservices?niche=coaching" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">Coaching</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-2 text-sm font-light tracking-wide transition-all duration-300 rounded-lg ${
                      activeSection === item.id
                        ? 'text-blue-400 bg-blue-400/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;