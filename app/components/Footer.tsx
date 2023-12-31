'use strict';

import React from 'react';

interface FooterProps {
  onLogout: () => void;
}

const Footer: React.FC<FooterProps> = ({ onLogout }) => {
  const logoutAndFlushStorage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const confirmed = window.confirm('Are you sure you want to logout?');

    if (!confirmed) {
      return;
    }

    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }

    if (onLogout) {
      onLogout();
    }
  };

  return (
    <button
      className="rounded-lg bg-red-400 text-white w-full h-8"
      onClick={logoutAndFlushStorage}
    >
      Logout
    </button>
  );
};

export default Footer;