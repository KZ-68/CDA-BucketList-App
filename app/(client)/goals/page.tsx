'use client';
import { useEffect, useState } from 'react';
import FetchAllGoalsService from '@/services/FetchAllGoalsService';


interface Goal {
  label: string;
  description: string;
  isAccomplished: boolean;
}

const GoalsPage = () => {
   
  
  const [goals, setGoals] = useState<Goal[]>([]);

  const dataGoals = FetchAllGoalsService();

  useEffect(() => {   
    if (dataGoals) {
      setGoals(dataGoals.data);
    }
  }, [dataGoals]);

  return (
    <>
      <h1>GOALS : </h1>

      <div>
        {goals.length === 0 ? (
          <p>No goals found.</p>
        ) : (
          goals.map((goal, index) => (
            <div key={index} className='flex'>
              <h3>{goal.label} : </h3>
              <p>{goal.description} - </p>
              <p>{goal.isAccomplished ? 'Accomplished' : 'Not accomplished'}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default GoalsPage;
