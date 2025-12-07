"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", color: "blue" },
    { href: "/journal", label: "Journal", color: "purple" },
    { href: "/companion", label: "AI Companion", color: "green" },
    { href: "/reading-plan", label: "Reading Plan", color: "orange" },
  ];

  const getLinkClasses = (color: string, isActive: boolean = false) => {
    const baseClasses = "px-3 py-2 rounded-lg font-medium text-sm transition-colors";
    const colorClasses = {
      blue: isActive 
        ? "text-blue-600 bg-blue-50" 
        : "text-slate-700 hover:bg-blue-50 hover:text-blue-600",
      purple: isActive 
        ? "text-purple-600 bg-purple-50" 
        : "text-slate-700 hover:bg-purple-50 hover:text-purple-600",
      green: isActive 
        ? "text-green-600 bg-green-50" 
        : "text-slate-700 hover:bg-green-50 hover:text-green-600",
      orange: isActive 
        ? "text-orange-600 bg-orange-50" 
        : "text-slate-700 hover:bg-orange-50 hover:text-orange-600",
    };
    return `${baseClasses} ${colorClasses[color as keyof typeof colorClasses]}`;
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      
      <nav className="bg-white shadow-md border-b border-slate-200 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            onClick={closeMenu}
          >
            Scripture Tracker
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={getLinkClasses(link.color, pathname === link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-all duration-300 ease-in-out active:scale-95"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg
              className={`w-6 h-6 transition-all duration-300 ease-in-out ${isOpen ? "rotate-90" : "rotate-0"}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path 
                  d="M6 18L18 6M6 6l12 12" 
                  className="transition-opacity duration-300 ease-in-out"
                />
              ) : (
                <path 
                  d="M4 6h16M4 12h16M4 18h16" 
                  className="transition-opacity duration-300 ease-in-out"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-3 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`block transform transition-all duration-300 ease-out ${
                  isOpen 
                    ? "translate-x-0 opacity-100" 
                    : "-translate-x-4 opacity-0"
                } ${getLinkClasses(link.color, pathname === link.href)}`}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : "0ms"
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}

