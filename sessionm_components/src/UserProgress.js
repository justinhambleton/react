// src/UserProgress.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProgress = () => {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://domains-connecteast1.ent-sessionm.com/incentives/api/Progress/GetUserProgressByTierSystem', {
          params: { userId: 'USER_ID', tierSystemId: 'TIER_SYSTEM_ID' }, // Replace with actual IDs
        });
        setProgress(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (!progress) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Progress</h1>
      <pre>{JSON.stringify(progress, null, 2)}</pre>
    </div>
  );
};

export default UserProgress;
