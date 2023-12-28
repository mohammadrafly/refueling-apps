'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [Username, setUsername] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUsername = localStorage.getItem("username")

      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  const logoutAndFlushStorage = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem("username", "");
      localStorage.setItem("password", "");
    }
    router.push('/', { scroll: false });
  }

  return (
    <main className="flex text-black min-h-screen items-center justify-center bg-white p-24">
        <div>
          <div className="text-lg">
            Welcome to Dashboard
          </div>
          <div className="flex items-center justify-center">
            Hi, 
            <span className="ml-1 font-semibold"> {Username}</span>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="text-red-600"
              type="button"
              onClick={logoutAndFlushStorage}
            >
              Logout
            </button>
          </div>
        </div> 
    </main>
  )
};

export default Page;