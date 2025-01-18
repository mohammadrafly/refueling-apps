import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface PitStopProviderProps {
  children: ReactNode;
}

interface PitStop {
  timestamp: string;
  date: string;
  time: string;
  vehicleId: string;
  vehicleType: string;
  vehicleHandler: string;
  refueler: string;
  gasAmount: number;
}

interface PitStopContextType {
  pitStops: PitStop[];
  loading: boolean;
}

const PitStopContext = createContext<PitStopContextType | undefined>(undefined);

export const PitStopProvider: React.FC<PitStopProviderProps> = ({ children }) => {
  const [pitStops, setPitStops] = useState<PitStop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPitStops = async () => {
      try {
        const pitStopsCollection = collection(db, 'refuelling');
        const pitStopsSnapshot = await getDocs(pitStopsCollection);
        const pitStopsList = pitStopsSnapshot.docs.map(doc => doc.data() as PitStop);
        setPitStops(pitStopsList);
      } catch (error) {
        console.error('Error fetching pit stops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPitStops();
  }, []);

  return (
    <PitStopContext.Provider value={{ pitStops, loading }}>
      {children}
    </PitStopContext.Provider>
  );
};

export const usePitStop = (): PitStopContextType => {
  const context = useContext(PitStopContext);
  if (!context) {
    throw new Error('usePitStop must be used within a PitStopProvider');
  }
  return context;
};
