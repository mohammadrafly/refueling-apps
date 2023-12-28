'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [Username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUsername = localStorage.getItem("username")

      setTimeout(() => {
        if (storedUsername) {
          setUsername(storedUsername);
        } else {
          router.push('/', { scroll: false });
        }
        setIsLoading(false);
      }, 5000);
    }
  }, [router]);

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
          {isLoading ? (
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2.5 bg-gray-300 rounded-full w-48 mb-4"></div>
              <div className="h-2.5 bg-gray-300 rounded-full w-16 mb-4"></div>
              <div className="h-2.5 bg-gray-300 rounded-full w-16 mb-4"></div>
            </div>
          ) : (
            <>
              <div className="text-lg">
                Welcome to Dashboard
              </div>
              <div>
                Hi, 
                <span className="ml-1 font-semibold"> {Username}</span>
              </div>
              {Username && (
                <div>
                  <button
                    className="text-red-600"
                    type="button"
                    onClick={logoutAndFlushStorage}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div> 
    </main>
  )
};

export default Page;