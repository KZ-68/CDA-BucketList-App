'use client';
import { useEffect, useState } from 'react';
import { useAuth } from "@clerk/nextjs";
import CollectionItem from "@/components/CollectionItem";
import PageTitle from "@/components/PageTitle";
import { LuPlus } from "react-icons/lu";
import Link from 'next/link';

interface Collection {
    id: string;
    label: string;
    isPrivate : boolean;
    accomplishedGoals: number;
    goals : Goal[];
    _count?: {
      goals: number;
    };
}

interface Goal {
    id: string;
    isAccomplished: boolean;
}

const CollectionsPage = () => {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [filter, setFilter] = useState<string>('All');
    const { userId } = useAuth(); 
  
    useEffect(() => {
      if (!userId) return;
      const fetchCollections = async () => {
        try {
          const response = await fetch(`/api/collections/user`);
          const data = await response.json();
          setCollections(data.data || []);

        } catch (error) {
          console.error("Erreur lors de la récupération des collections :", error);
        }
      };
  
      fetchCollections();
    }, [userId]);

    // console.log('collections', collections)
    
    const filteredCollections = collections.filter((collection) => {
      const totalGoals = collection.goals.length;
      if (filter === 'All') return true;
      if (filter === 'Completed') return collection.accomplishedGoals === totalGoals;
      if (filter === 'In Progress') return collection.accomplishedGoals > 0 && collection.accomplishedGoals < totalGoals;
      if (filter === 'Not Started') return collection.accomplishedGoals === 0;
      return true;
  });
  
    return (
      <>
        <PageTitle title=' my collections' />

        <div className='text-lg mb-20'>
          <div className='flex flex-col gap-3 mb-6 '>
            <p>State :</p>
            
            <div className='flex gap-2 flex-wrap'>
              <p
                  className={`bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base cursor-pointer hover:border-accentColor hover:text-accentColor ${filter === 'Completed' ? 'border-accentColor text-accentColor' : ''}`}
                  onClick={() => setFilter('Completed')}
              >
                  Completed
              </p>
              <p
                  className={`bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base cursor-pointer hover:border-accentColor hover:text-accentColor ${filter === 'In Progress' ? 'border-accentColor text-accentColor' : ''}`}
                  onClick={() => setFilter('In Progress')}
              >
                  In Progress
              </p>
              <p
                  className={`bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base cursor-pointer hover:border-accentColor hover:text-accentColor ${filter === 'Not Started' ? 'border-accentColor text-accentColor' : ''}`}
                  onClick={() => setFilter('Not Started')}
              >
                  Not Started
              </p>
              <p
                  className={`bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base cursor-pointer hover:border-accentColor hover:text-accentColor ${filter === 'All' ? 'border-accentColor text-accentColor' : ''}`}
                  onClick={() => setFilter('All')}
              >
                  All
              </p>
          </div>

          </div>
          <div className='flex flex-col gap-3  '>
            <p>Sort by :</p>
            <div className='flex gap-2 flex-wrap'>
              <p className='bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base'>Date</p>
              <p className='bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base'>Goals</p>
              <p className='bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base'>Completion</p>
            </div>
          </div>
        </div>


  
        <div className='flex  flex-col gap-12 mb-16'>
          {collections.length === 0 ? (
            <p>Loading...</p>
          ) : (
            filteredCollections.map((collection :Collection, index: number) => (
              <div key={collection.label || index} className='flex flex-col'>
                
                <CollectionItem 
                  label = {collection.label}
                  totalGoal = {collection._count?.goals || 0}
                  achievedGoal= {collection.accomplishedGoals}
                  isPrivate = {collection.isPrivate} 
                  id = {collection.id}/>
              </div>
            ))
          )}
        </div>

        <div className='flex items-center justify-end gap-3'>
          <p className='text-lg'>Create a new collection</p>
          <Link href="/collections/new" className='bg-accentColor text-darkGrey w-12 h-12 flex justify-center items-center rounded-[50%] p-3 hover:bg-thirdColor cursor-pointer  hover:scale-105'>
            <div className='text-4xl'>
                <LuPlus />  
            </div>
          </Link>
        </div>

      </>
    );
  };
  
export default CollectionsPage;

