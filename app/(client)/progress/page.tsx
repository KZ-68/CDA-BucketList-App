'use client';
import React from 'react';
import PageTitle from "@/components/PageTitle";
import ProgressSection from "@/components/ProgressSection";
import GoalHighlightsItem from "@/components/GoalHighlightsItem";
import {  useUser } from "@clerk/nextjs";
import { TbStarsFilled } from "react-icons/tb";
import { ImStatsBars2 } from "react-icons/im";

const ProgressPage = () => {
    const { user } = useUser();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userId = user?.id;


  return (
    <>
       <PageTitle title=' my progress' />
       <ProgressSection  
              title="goal highlights"
              icon={TbStarsFilled}
              color="accentColor" 
        />

    <div className='bg-darkGreylowOpacity rounded-b-lg border-l border-b border-accentColor pt-6 pr-3'>
        <GoalHighlightsItem text="Last goal completed :" variable="Swim with sharks" />
        <GoalHighlightsItem text="Category with Most Goals :" variable="Adventure" />
        <GoalHighlightsItem text="Next Goal suggestion :" variable="Why not try 'Attend a live concert'" />
        <GoalHighlightsItem text="Longest Streak :" variable=" 4 consecutive weeks with a completed goal" />
    </div>
    
        <ProgressSection  
              title="globale progression"
              icon={ImStatsBars2}
              color="secondColor" 
        />

    </>
  )
}

export default ProgressPage