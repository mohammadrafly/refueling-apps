import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface PitStop {
  date: string;
  time: string;
  vehicleType: string;
  refueler: string;
  fuelAmount: number;
}

const pitStops: PitStop[] = [
  { date: '2023-01-01', time: '10:00 AM', vehicleType: 'Dump Truck', refueler: 'John Doe', fuelAmount: 150 },
  { date: '2023-01-05', time: '02:30 PM', vehicleType: 'Light Vehicle', refueler: 'Jane Smith', fuelAmount: 60 },
  { date: '2023-01-01', time: '10:00 AM', vehicleType: 'Dump Truck', refueler: 'John Doe', fuelAmount: 150 },
  { date: '2023-01-05', time: '02:30 PM', vehicleType: 'Light Vehicle', refueler: 'Jane Smith', fuelAmount: 60 },
  { date: '2023-01-01', time: '10:00 AM', vehicleType: 'Dump Truck', refueler: 'John Doe', fuelAmount: 150 },
  { date: '2023-01-05', time: '02:30 PM', vehicleType: 'Light Vehicle', refueler: 'Jane Smith', fuelAmount: 60 },
];

const getVehicleIcon = (vehicleType: string): JSX.Element => {
  if (vehicleType === 'Dump Truck') {
    return <FontAwesomeIcon icon={faTruck} className="text-white" />;
  } else if (vehicleType === 'Light Vehicle') {
    return <FontAwesomeIcon icon={faCar} className="text-white" />;
  }
  return <></>;
};

const vehicleTypeColors: Record<string, string> = {
  'Dump Truck': 'bg-red-500',
  'Light Vehicle': 'bg-blue-500',
};

const LastRefuel: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [displayedPitStops, setDisplayedPitStops] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadMore = () => {
    setDisplayedPitStops(displayedPitStops + 5);
  };

  return (
    <>
      {loading ? (
        <>
          <div className="bg-gray-400 animate-pulse rounded-full w-64 h-4 mb-4"></div>
          <div className="flex items-center text-gray-500">
            <div className="max-w-sm animate-pulse p-4 flex">
              <div>
                <div className="bg-gray-400 rounded-full w-[50px] h-[50px] mb-4"></div>
              </div>
            </div>
            <div className="ml-3">
              <div className={`h-5 bg-gray-400 rounded-full w-32 mb-4 animate-pulse`}></div>
              <div className={`h-2.5 bg-gray-400 rounded-full w-32 mb-4 animate-pulse`}></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold">History Refuel</h1>
          <div className="text-gray-500 bg-gray-200 rounded-lg border-2 border-gray-400 mb-2 mt-2">
            {pitStops.slice(0, displayedPitStops).map((pitStop, index) => (
              <div key={index} className="flex items-center">
                <Link href="#">
                  <div className="max-w-sm p-4 flex items-center">
                    <div>
                      <div className={`${vehicleTypeColors[pitStop.vehicleType]} rounded-full w-[50px] h-[50px] mb-4 flex items-center justify-center`}>
                        {getVehicleIcon(pitStop.vehicleType)}
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="ml-3">
                  <div className="mb-4">
                    {pitStop.refueler} - {pitStop.time}
                  </div>
                  <div className="mb-4">
                    {pitStop.fuelAmount} Liters of Fuel
                  </div>
                </div>
              </div>
            ))}
          </div>
          {pitStops.length > displayedPitStops && (
            <button
              className="text-black px-4 py-2 rounded mt-2"
              onClick={handleLoadMore}
            >
              Load More ..
            </button>
          )}
        </>
      )}
    </>
  );
};

export default LastRefuel;