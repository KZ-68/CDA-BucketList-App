'use client';
import { useEffect, useState } from 'react';

interface Goal {
  label: string;
  description: string;
  isAccomplished: boolean;
}

const GoalsPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {   
    const fetchGoals = async () => {
      try {
        const response = await fetch('/api/goals');
        const data = await response.json();
        console.log("Fetched goals:", data);
        setGoals(data.data);

      } catch (error) {
        console.error("Erreur lors de la récupération des objectifs :", error);
      }
    };

    fetchGoals();
  }, []);

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
