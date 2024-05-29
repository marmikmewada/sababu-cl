import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import styles from './AppNav.module.css';
import useStore from '../zustand/store';

function AppNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const role = useStore((state) => state.role); // Get user role from Zustand store

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`${'navbar sticky-top navbar-expand-lg navbar-dark'} ${styles.nav}`}>
      <NavLink className="navbar-brand" to="/" onClick={closeMenu}>
        <Logo />
      </NavLink>
      <button className="navbar-toggler" type="button" onClick={toggleMenu}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div ref={menuRef} className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
        <ul className="navbar-nav ms-auto">
          <List closeMenu={closeMenu} isAuthenticated={isAuthenticated} role={role} />
        </ul>
      </div>
    </nav>
  );
}

function List({ closeMenu, isAuthenticated, role }) {
  return (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/" onClick={closeMenu}>
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/about" onClick={closeMenu}>
          About
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/services" onClick={closeMenu}>
          Services
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/events" onClick={closeMenu}>
          Events
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/app/membership" onClick={closeMenu}>
          Membership
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/contact" onClick={closeMenu}>
          Contact
        </NavLink>
      </li>
      {!isAuthenticated && (
        <li className="nav-item">
          <NavLink className="nav-link" to="/app/users/login" onClick={closeMenu}>
            Sign In
          </NavLink>
        </li>
      )}
      {isAuthenticated && (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/app/profile" onClick={closeMenu}>
              Profile
            </NavLink>
          </li>
          {role === 'admin' && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin" onClick={closeMenu}>
                Admin
              </NavLink>
            </li>
          )}
        </>
      )}
    </>
  );
}

export default AppNav;
