import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCamera, faListUl } from '@fortawesome/free-solid-svg-icons';
import Webcam from 'webcamjs';
import jsQR from 'jsqr';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const Menu = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isCameraError, setIsCameraError] = useState(false);
  const [cameraDimensions, setCameraDimensions] = useState({ width: 320, height: 240 });
  const [gasAmount, setGasAmount] = useState<number | null>(null);
  const [vehicleId, setVehicleId] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleHandler, setVehicleHandler] = useState('');
  const [refueler, setRefueler] = useState('');
  const [isGasInputVisible, setIsGasInputVisible] = useState(false);
  const [refuelHistory, setRefuelHistory] = useState<any[]>([]);

  useEffect(() => {
    const updateCameraDimensions = () => {
      const width = window.innerWidth - 40;
      const height = Math.floor(width * (3 / 4));
      setCameraDimensions({ width, height });
    };

    updateCameraDimensions();
    window.addEventListener('resize', updateCameraDimensions);

    return () => {
      window.removeEventListener('resize', updateCameraDimensions);
    };
  }, []);

  const handleCameraClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsCameraOpen(true);

    Webcam.set({
      width: cameraDimensions.width,
      height: cameraDimensions.height,
      image_format: 'jpeg',
      jpeg_quality: 90,
      force_flash: false,
      flip_horiz: true,
      fps: 60,
    });

    Webcam.attach(videoRef.current, (err: any) => {
      if (err) {
        console.error('Error attaching webcam:', err);
        setIsCameraError(true);
      } else {
        console.log('Webcam attached successfully');
      }
    });
  };

  const handleGasInput = async () => {
    if (gasAmount !== null) {
      const newRefuelHistory = [...refuelHistory, { vehicleId, gasAmount }];
      setRefuelHistory(newRefuelHistory);

      const currentTimestamp = new Date();

      try {
        await addDoc(collection(db, 'refuelling'), {
          gasAmount,
          timestamp: currentTimestamp,
          vehicleId,
          vehicleType,
          vehicleHandler,
          refueler,
        });
        console.log('Refuel history saved to Firebase');
        window.location.reload();
      } catch (error) {
        console.error('Error saving refuel history to Firebase:', error);
      }

      setGasAmount(null);
      setIsGasInputVisible(false);
      setVehicleId('');
    }
  };

  useEffect(() => {
    const scanQRCode = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const videoElement = videoRef.current.querySelector('video');

      if (videoElement && context) {
        canvas.width = cameraDimensions.width;
        canvas.height = cameraDimensions.height;
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        const getRandomVehicleType = () => {
          const vehicleTypes = ['Dump Truck', 'Light Vehicle'];
          return vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
        };

        if (code) {
          const storedUsername = localStorage.getItem('username');
          setVehicleHandler('John Doe');
          setVehicleId(code.data);
          setVehicleType(getRandomVehicleType());
          setRefueler(storedUsername || 'Anonymous');
          setIsGasInputVisible(true);
        } else {
          console.log('No QR code detected');
        }
      }
    };

    if (isCameraOpen) {
      const scanInterval = setInterval(scanQRCode, 100);

      return () => clearInterval(scanInterval);
    }
  }, [cameraDimensions.height, cameraDimensions.width, isCameraOpen]);

  return (
    <div>
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-2xl p-4 max-h-screen overflow-y-auto transform transition-transform duration-500 ${
          isCameraOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Camera</h2>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={() => {
              setIsCameraOpen(false);
              Webcam.reset();
            }}
          >
            Close
          </button>
        </div>

        {isCameraError ? (
          <p className="text-red-500">
            Error accessing the camera. Please check your permissions.
          </p>
        ) : (
          <div className="mb-32">
            <div ref={videoRef} className="w-full h-full bg-black"></div>
            <canvas ref={canvasRef} className="hidden"></canvas>
            {isGasInputVisible && (
              <div>
                <label htmlFor="gasAmount" className="block text-sm font-medium text-gray-700">
                  Enter Gas Amount (Liters)
                </label>
                <input
                  type="number"
                  id="gasAmount"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={gasAmount || ''}
                  onChange={(e) => setGasAmount(Number(e.target.value))}
                  placeholder="Enter gas amount"
                />
                <button
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleGasInput}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 h-[75px] left-0 right-0 p-5 text-gray-500 bg-gray-800">
        <nav className="flex justify-around p-1">
          <a href="#" className="text-gray-500">
            <FontAwesomeIcon icon={faHome} size="lg" />
          </a>
          <a
            href="#"
            className="text-gray-500 relative"
            onClick={handleCameraClick}
          >
            <span className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white p-7 rounded-full">
              <FontAwesomeIcon icon={faCamera} size="lg" />
            </span>
          </a>
          <a href="#" className="text-gray-500">
            <FontAwesomeIcon icon={faListUl} size="lg" />
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
