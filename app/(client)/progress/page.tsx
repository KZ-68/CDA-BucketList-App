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
import fetchUserCollectionsData from '@/services/FetchUserCollectionService'

interface CategoriesProgress {
  categoryId: string;
  categoryName: string;
  goalsCompleted: number;
  totalGoals: number;
  progress: string;
}

const ProgressPage = () => {
  const { user } = useUser();
  const userId = user ? user.id : redirect("/login");

  const [lastGoalAccomplishedLabel, setLastGoalAccomplishedLabel] = useState("");
  const [totalGoals, setTotalGoals] = useState(0);
  const [totalAccomplishedGoals, setTotalAccomplishedGoals] = useState(0);
  const [totalGoalsPercent, setTotalGoalsPercent] = useState("");
  const [goalSuggestion, setGoalSuggestion] = useState("");
  const [collectionNotStarted, setCollectionNotStarted] = useState("");
  const [collectionCompleted, setCollectionCompleted] = useState("");
  const [collectionInProgress, setCollectionInProgress] = useState("");
  const [categoriesProgress, setCategoriesProgress] = useState<CategoriesProgress[]>([]);
  console.log(lastGoalAccomplishedLabel);

  useEffect(() => {   
        fetchUserCollectionsData(userId).then(
          data => (
            setLastGoalAccomplishedLabel(data.lastGoalAccomplished[0].label),
            setTotalGoals(data.totalGoals),
            setTotalAccomplishedGoals(data.totalAccomplishedGoals),
            setTotalGoalsPercent((data.totalAccomplishedGoals * 100 / data.totalGoals).toFixed(2)),
            setGoalSuggestion(data.goalSuggestion[0].label),
            setCollectionNotStarted((data.collectionsNotStarted * 100 / data.totalCollections).toFixed(0)),
            setCollectionCompleted((data.collectionsCompleted * 100 / data.totalCollections).toFixed(0)),
            setCollectionInProgress((data.collectionsInProgress * 100 / data.totalCollections).toFixed(0)),
            setCategoriesProgress(data.categoriesStats)
          )
        );
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
          categoriesProgress={categoriesProgress}
        />
    </>
  )
}

export default ProgressPage