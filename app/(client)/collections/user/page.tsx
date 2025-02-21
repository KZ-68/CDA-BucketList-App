'use client';
import { useEffect, useState } from 'react';
import { useAuth } from "@clerk/nextjs";
import CollectionItem from "@/components/CollectionItem";
import PageTitle from "@/components/PageTitle";

interface Collection {
    label: string;
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
  
    return (
      <>
        {/* <h1>Hello {user?.username || 'User'}</h1> */}
        <PageTitle title=' my collections' />

        <div className='text-lg'>
          <div className='flex flex-col gap-3 mb-6 '>
            <p>State :</p>
            <div className='flex gap-2 flex-wrap'>
              <p className='bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base cursor-pointer hover:border-accentColor hover:text-accentColor'>Completed</p>
              <p className='bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base cursor-pointer hover:border-accentColor hover:text-accentColor'>In Progress</p>
              <p className='bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base cursor-pointer hover:border-accentColor hover:text-accentColor'>Not Started</p>
            </div>
          </div>
          <div className='flex flex-col gap-3 mb-14 '>
            <p>Sort by :</p>
            <div className='flex gap-2 flex-wrap'>
              <p className='bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base'>Date</p>
              <p className='bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base'>Goals</p>
              <p className='bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base'>Completion</p>
            </div>
          </div>
        </div>

        <h2 className=''>EXEMPLE COMPONENT</h2>
        <div>
          <CollectionItem />
        </div>
  
        <div>
          {collections.length === 0 ? (
            <p>No collections found.</p>
          ) : (
            collections.map((collection :Collection, index: number) => (
              <div key={collection.label || index} className='flex'>
                <h3>{collection.label} </h3>
                <span> - {collection._count?.goals || 0} {collection._count?.goals === 1 || collection._count?.goals === 0   ? 'goal' : 'goals'}</span>
              </div>
            ))
          )}
        </div>
      </>
    );
  };
  
export default CollectionsPage;

