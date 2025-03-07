'use client';
import React, { useEffect, useState } from 'react';
import PageTitle from "@/components/PageTitle";
import ProgressSection from "@/components/ProgressSection";
import GoalHighlightsItem from "@/components/GoalHighlightsItem";
import {  useUser } from "@clerk/nextjs";
import { TbStarsFilled } from "react-icons/tb";
import { ImStatsBars2 } from "react-icons/im";
import GlobalProgress from '@/components/GlobalProgress';
import { redirect } from 'next/navigation';

const ProgressPage = () => {
  const { isSignedIn, user } = useUser();
  const userId = user ? user.id : null;
  if(isSignedIn === false) {
    redirect('/login');
  }

  const [lastGoalAccomplishedLabel, setLastGoalAccomplishedLabel] = useState("");
  const [totalGoals, setTotalGoals] = useState(0);
  const [totalAccomplishedGoals, setTotalAccomplishedGoals] = useState(0);
  const [totalGoalsPercent, setTotalGoalsPercent] = useState("");
  const [goalSuggestion, setGoalSuggestion] = useState("");
  const [collectionNotStarted, setCollectionNotStarted] = useState("");
  const [collectionCompleted, setCollectionCompleted] = useState("");
  const [collectionInProgress, setCollectionInProgress] = useState("");
  console.log(lastGoalAccomplishedLabel);

  useEffect(() => {   
    const fetchGoals = async () => {
      try {
        const response = await fetch(`/api/collections/user/${userId}`);
        const data = await response.json();
        const totalCollections = data.totalCollections;
        const lastGoalCompleted = data.lastGoalAccomplished[0].label;
        const dataTotalGoals = data.totalGoals;
        const dataLastGoalCompleted = data.totalAccomplishedGoals;
        const dataGoalSuggestion = data.goalSuggestion[0].label;
        const dataNotStarted = data.collectionsNotStarted;
        const dataCompleted = data.collectionsCompleted;
        const dataInProgress = data.collectionsInProgress;
        
        const calcTotalGoalsPercent =  dataLastGoalCompleted * 100 / dataTotalGoals;
        const calcNotStarted = dataNotStarted * 100 / totalCollections;
        const calcCompleted = dataCompleted * 100 / totalCollections;
        const calcInProgress = dataInProgress * 100 / totalCollections; 

        setLastGoalAccomplishedLabel(lastGoalCompleted);
        setTotalGoals(dataTotalGoals);
        setTotalAccomplishedGoals(dataLastGoalCompleted);
        setTotalGoalsPercent(calcTotalGoalsPercent.toFixed(2));
        setGoalSuggestion(dataGoalSuggestion);
        setCollectionNotStarted(calcNotStarted.toFixed(0));
        setCollectionCompleted(calcCompleted.toFixed(0));
        setCollectionInProgress(calcInProgress.toFixed(0));

      } catch (error) {
        console.error("Erreur lors de la récupération des objectifs :", error);
      }
    };

    fetchGoals();
  }, [userId]);

  return (
    <>
      <PageTitle title=' my progress' />
      <ProgressSection  
              title="goal highlights"
              icon={TbStarsFilled}
              color="accentColor" 
        />

    <div className='bg-darkGreylowOpacit rounded-b-lg border-l border-b border-accentColor pt-6 pr-3'>
        <GoalHighlightsItem text="Last goal completed :" variable={lastGoalAccomplishedLabel} />
        <GoalHighlightsItem text="Category with Most Goals :" variable="Adventure" />
        <GoalHighlightsItem text="Next Goal suggestion :" variable={`Why not try: ${goalSuggestion}`} />
        <GoalHighlightsItem text="Longest Streak :" variable=" 4 consecutive weeks with a completed goal" />
    </div>
    
        <ProgressSection  
              title="globale progression"
              icon={ImStatsBars2}
              color="secondColor"
        />
        <GlobalProgress 
          totalGoals={totalGoals}
          goalsAccomplished={totalAccomplishedGoals}
          totalGoalsPercent={totalGoalsPercent}
          notStarted={collectionNotStarted}
          completed={collectionCompleted}
          inProgress={collectionInProgress}
        />
    </>
  )
}

export default ProgressPage