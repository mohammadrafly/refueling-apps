'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      }, 3000);
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
      <div className="text-black w-[450px] min-h-screen bg-white items-center justify-center p-4">
        {isLoading ? (
          <div role="status" className="max-w-sm animate-pulse p-4 flex">
            <div>
              <div className="bg-gray-400 rounded-full w-[50px] h-[50px] mb-4"></div>
            </div>
            <div className="ml-3">
              <div className="h-5 bg-gray-400 rounded-full w-32 mb-4"></div>
              <div className="h-2.5 bg-gray-400 rounded-full w-16 mb-4"></div>
            </div>
          </div>
        ) : (
          <>
            <Header username={username}></Header>
            <div className="flex items-center justify-center min-h-screen">
              <div>
                {showLogoutAlert && (
                  <div className="bg-green-200 text-green-800 p-2 mb-4">
                    You have been successfully logged out! Redirecting in {countdown} seconds.
                  </div>
                )}
                {!showLogoutAlert && <span>Hello, {username}</span>}
              </div>
            </div>
            <Footer onLogout={handleLogout} />
          </>
        )}
      </div>
    </main>
  );
};

export default Page;
