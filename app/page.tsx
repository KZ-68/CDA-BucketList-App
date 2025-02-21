'use client'
import React from 'react';
import MenuItem from "@/components/MenuItem";
import { useEffect, useState } from 'react';
import {  useUser } from "@clerk/nextjs";
import { HiOutlineChartBarSquare } from "react-icons/hi2";
import { RiLightbulbFill, RiCompass3Fill } from "react-icons/ri";
import { LuLayoutList } from "react-icons/lu";

interface Collection {
  label: string;
  _count?: {
    goals: number;
  };
}

const Home = () => {
  const { user } = useUser();
  const userId = user?.id;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [collections, setCollections] = useState<Collection[]>([]);
  const [totalCollections, setTotalCollections] = useState<number>(0);
  const [totalGoals, setTotalGoals] = useState<number>(0);
  const [totalAccomplishedGoals, setTotalAccomplishedGoals] = useState<number>(0);

  useEffect(() => { 
    const fetchCollections = async () => {
      try {
        const response = await fetch(`/api/collections/user/${userId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCollections(data.data);
        setTotalCollections(data.totalCollections); // Nombre total de collections
        setTotalGoals(data.totalGoals); // Nombre total de goals
        setTotalAccomplishedGoals(data.totalAccomplishedGoals); // Nombre total de goals accomplis

      } catch (error) {
        console.error("Erreur lors de la récupération des collections :", error);
      }
    };

    fetchCollections();
  }, [userId]); // L'effet se relance uniquement si `userId` change

  const completionRate = totalGoals > 0 ? Math.round((totalAccomplishedGoals / totalGoals) * 100) : 0;


  return (
    <>
    <div className='flex flex-col justify-center text-6xl tracking-wider mb-10'>
      <h1 className='text-6xl font-secondary mb-2'>WELCOME,</h1>
      <p className='text-[40px] text-thirdColor capitalize font-medium'>{user?.username || 'User'}</p>
    </div>

    <div className='h-64 w-full mb-16 flex gap-4'>
      <div className='bg-accentColor flex flex-col items-start justify-between h-full w-1/2 rounded-xl text-darkGrey p-3 max-w-fit'>
        <div className='w-1/2 h-1/3 bg-red-500'>LOGO</div>
        <div className='flex flex-col items-start gap-2 rounded-xl py-3 px-3 my-3'>
          <div>
            <p className='text-5xl font-medium font-secondary'>{totalCollections.toString().padStart(2, '0')}</p>
            <p className='text-xl font-bold leading-[0.8rem]'>Collections</p>
          </div>
          <div>
            <p className='text-5xl font-medium font-secondary'>{totalGoals.toString().padStart(2, '0')}</p>
            <p className='text-xl font-bold leading-[0.8rem]'>Goals</p>
          </div>
        </div>
      </div>
      <div className=' h-full w-1/2 flex flex-col gap-4'>
        
        <div className='text-white bg-secondColor h-1/2 rounded-xl text-neutralWhite p-3 flex max-w-fit'>
          <div className=' flex items-end'>
            <p className='font-secondary text-5xl'>{completionRate}</p>
          </div>
          <div className='flex flex-col justify-end'>
            <div className='font-secondary text-xl leading-[0.8rem]'>%</div>
            <div className='text-xl font-bold'>Achieved</div>
          </div>
        </div>

        <div className='bg-thirdColor h-1/2 rounded-xl text-neutralWhite p-3 w-40'></div>
      </div>

    </div>

    <div> </div>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <MenuItem
        text="See What's on My List"
        color="accentColor"
        icon={LuLayoutList}
        url={""}
      />
      <MenuItem
        text="Start a New Adventure"
        color="secondColor"
        icon={RiCompass3Fill}
        url={"collections/new"}
      />
      <MenuItem
        text="Get Inspired by Others"
        color="thirdColor"
        icon={RiLightbulbFill}
        url={""}
      />
      <MenuItem
        text="Track My Progress"
        color="neutralWhite"
        icon={HiOutlineChartBarSquare}
        url={"/progress"}
      />
    </div>

    
    </>
  );
}

export default Home