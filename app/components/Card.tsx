'use strict';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Card = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

    return (
      <>
        {loading ? (
          <>
            <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden rounded-lg mb-[50px] animate-pulse">
              <div className="w-full h-40 object-cover animate-pulse bg-gray-400 flex items-center justify-center">
                <FontAwesomeIcon
                  width={100}
                  height={100}
                  className="text-gray-200"
                  icon={faCamera}
                />
              </div>
              <div className="p-6">
                <div className="bg-gray-400 w-32 h-8 rounded-full animate-pulse mb-3"></div>
                <div className="bg-gray-400 w-64 h-4 rounded-full animate-pulse mb-2"></div>
                <div className="bg-gray-400 w-64 h-4 rounded-full animate-pulse"></div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden rounded-lg mb-[50px]">
              <Image
                width={50}
                height={50}
                className="w-full h-40 object-cover"
                src="https://via.placeholder.com/400x200"
                alt="Card Image"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Card Title</h2>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </>
        )}
      </>
    );
  };
  
  export default Card;