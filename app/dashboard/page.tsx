'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import Card from '../components/Card';
import LastRefuel from '../components/LastRefuel';

const Page = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUsername = localStorage.getItem('username');

      setTimeout(() => {
        if (storedUsername) {
          setUsername(storedUsername);
        } else {
          router.push('/', { scroll: false });
        }
        setIsLoading(false);
      }, 1000);
    }
  }, [router]);

  useEffect(() => {
    if (showLogoutAlert) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, [showLogoutAlert, setCountdown]);

  useEffect(() => {
    if (countdown === 0) {
      router.push('/');
    }
  }, [countdown, router]);

  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  return (
    <main className="flex items-center justify-center bg-gray-200">
      <div className="text-black w-[500px] min-h-screen bg-white items-center justify-center p-4">
        {!showLogoutAlert && 
          <>
            <Header username={username} />
          </>
        }
          <LastRefuel />
          <div>
            {showLogoutAlert && (
              <div className="bg-green-200 text-green-800 p-2 mb-4 rounded-lg">
                You have been successfully logged out! Redirecting in {countdown} seconds.
              </div>
            )}
          </div>
            {!showLogoutAlert && 
              <>
                <Footer onLogout={handleLogout} />
                <Menu />
              </>
            }
      </div>
    </main>
  );
};

export default Page;
