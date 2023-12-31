'use strict';

import Image from 'next/image';

const Card = () => {
    return (
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
    );
  };
  
  export default Card;