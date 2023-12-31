'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [Username, setUsername] = useState("Username");
  const [Password, setPassword] = useState("Password");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        router.push('/dashboard', { scroll: false });
      }
    }
  }, [router]);

  const saveMeToLocalStorage = async (e: { preventDefault: () => void; }) => {
    try {
      e.preventDefault();
      setIsLoading(true);
  
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          localStorage.setItem("username", Username);
          localStorage.setItem("password", Password);
  
          setIsLoading(false);
          router.push('/dashboard', { scroll: false });
  
          resolve();
        }, 3000);
      });
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoading(false);
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  }

  return (
    <main className="flex items-center justify-center bg-gray-200">
      <div className="text-black w-[450px] min-h-screen bg-white flex items-center justify-center">
        <div className="w-full p-4">
          <div className="mt-4 md:mt-[50px] mb-4 md:mb-[50px] mx-auto font-semibold text-2xl flex items-center justify-center">
            <span className="mr-2 text-2xl font-extrabold">Refueling Apps</span>
          </div>
          <div className="flex items-center justify-center mb-4 md:mb-[50px]">
            Gunakan akun refueling apps anda
          </div>
          <form className="p-2" onSubmit={saveMeToLocalStorage}>
            <div className="mb-5">
              <label className="text-sm">Username</label>
              <div className="mt-2">
                <input 
                  type="text"
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="skinnyFabs22"
                  className="bg-gray-200 p-2 rounded-lg w-full"
                />
              </div>
            </div>
            <div>
              <label className="text-sm">Password</label>
              <div className="mt-2 relative">
                <input 
                  type={passwordVisible ? 'text' : 'password'}
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*************" 
                  className="bg-gray-200 p-2 rounded-lg w-full"
                />
                <FontAwesomeIcon 
                  width={20} 
                  icon={passwordVisible ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className="text-gray-500 hover:text-gray-600"
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
              </div>
            </div>
            <input
              onClick={() => router.push('/dashboard')}
              type="submit"
              value={isLoading ? "Logging in..." : "Login"}
              disabled={isLoading}
              className={`mt-5 p-3 ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-500"
              } text-white rounded-lg w-full flex items-center justify-center`}
            />
          </form>
        </div>
      </div>
    </main>
  )
};

export default Page;