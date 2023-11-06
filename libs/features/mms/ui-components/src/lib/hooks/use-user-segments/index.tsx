import { useState, useEffect } from 'react';

import { UserSegment, useLazyGetUserSegmentsQuery } from '@lths/features/mms/data-access';

export const useUserSegments = () => {
  const [getUserSegmentList] = useLazyGetUserSegmentsQuery();

  const [userSegments, setUserSegments] = useState<UserSegment[]>([]);

  const fetchUserSegmentList = async () => {
    try {
      const response = await getUserSegmentList().unwrap();
      if (response?.success) setUserSegments(response?.data);
    } catch (error) {
      console.error('Error in fetching user segment list');
    }
  };

  useEffect(() => {
    fetchUserSegmentList();
  }, []);

  return { userSegments };
};
