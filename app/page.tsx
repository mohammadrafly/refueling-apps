'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Page = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [Username, setUsername] = useState("Username");
  const [Password, setPassword] = useState("Password");

  const saveMeToLocalStorage = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    localStorage.setItem("username", Username);
    localStorage.setItem("password", Password);
    router.push('/dashboard', { scroll: false });
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  }

  return (
    <main className="flex text-black min-h-screen items-center justify-center bg-white p-24">
      <div className="text-gray-500 block justify-center w-[450px] min-h-[500px] bg-white border shadow-lg rounded-lg">
        <div className="mt-[50px] mb-[50px] mx-auto font-semibold text-2xl flex items-center justify-center">
          <Image 
            src="vercel.svg" 
            width={200}
            height={200}
            alt="Logo" 
            className="mr-2"
          />
          Login
        </div>
        <div className="flex items-center justify-center mb-[50px]">
          Gunakan akun refueling apps anda
        </div>

        <div className="border-t border-gray-300"></div>

        <form className="p-10" onSubmit={saveMeToLocalStorage}>
          <div className="mb-5">
            <label className="text-sm">Username</label>
            <div className="mt-2">
              <input 
                type="text"
                value={Username}
                onChange={e => setUsername(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
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
            type="submit"
            value="Login"
            onClick={() => router.push('/dashboard')}
            className="mt-5 p-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg w-full flex items-center justify-center"
          />
        </form>
      </div>
    </main>
  )
};

export default Page;