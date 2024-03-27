'use client';
import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'webcamjs';

const CameraComponent = () => {
  const videoRef = useRef(null);
  const [isCameraError, setIsCameraError] = useState(false);

  useEffect(() => {
    Webcam.set({
      width: 320,
      height: 240,
      image_format: 'jpeg',
      jpeg_quality: 90,
      force_flash: false,
      flip_horiz: true,
      fps: 45
    });

    Webcam.attach(videoRef.current, function(err) {
      if (err) {
        console.error('Error attaching webcam:', err);
        setIsCameraError(true);
      } else {
        console.log('Webcam attached successfully');
      }
    });

    return () => {
      Webcam.reset();
    };
  }, []);

  const takeSnapshot = () => {
    Webcam.snap(function(dataUri) {
      console.log('takeSnapshot', dataUri);
      // You can use the dataUri for further processing, like uploading the image
    });
  };

  return (
    <div>
      {isCameraError ? (
        <p className="text-red-500">Error accessing the camera. Please check your permissions.</p>
      ) : (
        <div>
          <div ref={videoRef}></div>
          <button onClick={takeSnapshot}>Take Snapshot</button>
        </div>
      )}
    </div>
  );
};

export default CameraComponent;
