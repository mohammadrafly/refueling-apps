import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { usePitStop } from '../context/PitStopContext';
import { Timestamp } from 'firebase/firestore';

const getVehicleIcon = (vehicleType: string): JSX.Element => {
  switch (vehicleType) {
    case 'Dump Truck':
      return <FontAwesomeIcon icon={faTruck} className="text-white" />;
    case 'Light Vehicle':
      return <FontAwesomeIcon icon={faCar} className="text-white" />;
    default:
      return <></>;
  }
};

const vehicleTypeColors: Record<string, string> = {
  'Dump Truck': 'bg-red-500',
  'Light Vehicle': 'bg-blue-500',
};

interface PitStopItemProps {
  pitStop: any;
}

const PitStopItem: React.FC<PitStopItemProps> = ({ pitStop }) => (
  <div className="flex items-center mb-4">
    <Link href="#">
      <div className="max-w-sm p-4 flex items-center">
        <div
          className={`${vehicleTypeColors[pitStop.vehicleType]} rounded-full w-[50px] h-[50px] flex items-center justify-center`}
        >
          {getVehicleIcon(pitStop.vehicleType)}
        </div>
      </div>
    </Link>
    <div className="ml-3">
      <div className="text-lg font-semibold mb-2">
        <strong>{pitStop.refueler}</strong> -
        <span className="text-gray-500">
          {(pitStop.timestamp as unknown as Timestamp)
            .toDate()
            .toLocaleString()}
        </span>
        {' '}| <strong>{pitStop.vehicleId}</strong> ({pitStop.vehicleHandler})
      </div>
      <div className="text-gray-600">{pitStop.gasAmount} Liters of Fuel</div>
    </div>
  </div>
);

const LastRefuel: React.FC = () => {
  const { pitStops, loading } = usePitStop();
  const [displayedPitStops, setDisplayedPitStops] = useState(5);

  const handleLoadMore = () => {
    setDisplayedPitStops(displayedPitStops + 5);
  };

  return (
    <div className="p-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4">History Refuel</h1>
          <div className="bg-gray-200 rounded-lg border-2 border-gray-400 p-4">
            {pitStops.slice(0, displayedPitStops).map((pitStop, index) => (
              <PitStopItem key={index} pitStop={pitStop} />
            ))}
          </div>
          {pitStops.length > displayedPitStops && (
            <button
              className="mt-4 px-4 py-2 rounded bg-blue-500 text-white"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default LastRefuel;
