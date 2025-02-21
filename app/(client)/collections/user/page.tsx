'use client';
import { useEffect, useState } from 'react';
import { useAuth, useUser } from "@clerk/nextjs";
import CollectionItem from "@/components/CollectionItem";
import PageTitle from "@/components/PageTitle";
import { LuPlus } from "react-icons/lu";
import Link from 'next/link';
interface Collection {
    label: string;
    isPrivate : boolean;
    accomplishedGoals: number;
    _count?: {
      goals: number;
    };
}

const CollectionsPage = () => {
    const [collections, setCollections] = useState<Collection[]>([]);
    const { userId } = useAuth(); 
    // const { user } = useUser();
  
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

    console.log('collections', collections)
  
    return (
      <>
        <PageTitle title=' my collections' />

        <div className='text-lg mb-20'>
          <div className='flex flex-col gap-3 mb-6 '>
            <p>State :</p>
            <div className='flex gap-2 flex-wrap'>
              <p className='bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base cursor-pointer hover:border-accentColor hover:text-accentColor'>Completed</p>
              <p className='bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base cursor-pointer hover:border-accentColor hover:text-accentColor'>In Progress</p>
              <p className='bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base cursor-pointer hover:border-accentColor hover:text-accentColor'>Not Started</p>
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
            collections.map((collection :Collection, index: number) => (
              <div key={collection.label || index} className='flex flex-col'>
                {/* <span> - {collection._count?.goals || 0} {collection._count?.goals === 1 || collection._count?.goals === 0   ? 'goal' : 'goals'}</span> */}
                <CollectionItem 
                  label = {collection.label}
                  totalGoal = {collection._count?.goals || 0}
                  achievedGoal= {collection.accomplishedGoals}
                  isPrivate = {collection.isPrivate} />
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

