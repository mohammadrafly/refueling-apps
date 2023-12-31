'use strict';

import React from 'react';
import { useState, useEffect } from 'react';

interface FooterProps {
  onLogout: () => void;
}

const Footer: React.FC<FooterProps> = ({ onLogout }) => {
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    {loading ? (
      <>
        <div
          className="animate-pulse rounded-lg bg-red-400 w-full h-8 mb-[100px]"
        >
        </div>
      </>
    ) : (
      <>
        <button
          className="rounded-lg bg-red-500 text-white w-full h-8 mb-[100px]"
          onClick={logoutAndFlushStorage}
        >
          Logout
        </button>
      </>
    )}
    </>
  );
};

export default Footer;