'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Webcam from 'react-webcam';

const CameraPage = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraError, setIsCameraError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(cameraStream);
      } catch (error) {
        console.error('Error accessing camera:', error);
        setIsCameraError(true);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const handleBackButtonClick = () => {
    router.push('/dashboard');
  };

  return (
    <main className="flex items-center justify-center bg-gray-200">
      <div className="text-black w-[500px] min-h-screen bg-white flex items-center justify-center">
        <div className="w-full p-6">
          <div>
            {isCameraError ? (
              <p className="text-red-500">Error accessing the camera. Please check your permissions.</p>
            ) : (
              <Webcam
                audio={false}
                mirrored={true}
                style={{ width: '100%' }}
              />
            )}
            <button
              onClick={handleBackButtonClick}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CameraPage;