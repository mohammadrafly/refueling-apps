'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const CameraPage = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraError, setIsCameraError] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const cameras = await navigator.mediaDevices.enumerateDevices();
        const backCamera = cameras.find((device) => device.kind === 'videoinput');

        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: backCamera?.deviceId || undefined,
            facingMode,
          },
        });

        setStream(cameraStream);

        if (videoRef.current) {
          videoRef.current.srcObject = cameraStream;
        }
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
  }, [facingMode]);

  const handleBackButtonClick = () => {
    router.push('/dashboard');
  };

  const handleCameraSwitch = () => {
    setFacingMode(facingMode === 'environment' ? 'user' : 'environment');
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
                mirrored={facingMode === 'user'}
                style={{ width: '100%' }}
              />
            )}
            <div className="flex justify-between mt-4">
              <button
                onClick={handleBackButtonClick}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Kembali
              </button>
              <button
                onClick={handleCameraSwitch}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Switch Camera
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CameraPage;
