import { useState, useEffect } from 'react';

import { LocationItem, useLazyGetLocationsQuery } from '@lths/features/mms/data-access';

export const useLocations = () => {
  const [getLocationList] = useLazyGetLocationsQuery();

  const [locations, setLocations] = useState<LocationItem[]>([]);

  const fetchLocationList = async () => {
    try {
      const response = await getLocationList().unwrap();
      if (response?.success) setLocations(response?.data);
    } catch (error) {
      console.error('Error in fetching location list');
    }
  };

  useEffect(() => {
    fetchLocationList();
  }, []);

  return { locations };
};
