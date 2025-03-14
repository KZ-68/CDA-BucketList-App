'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import PageTitle from "@/components/PageTitle";
import FetchAllCollectionsService from '@/services/FetchAllCollectionsService';
import { CollectionType as OriginalCollectionType, GoalType } from "@/types/types";
import { useAuth } from '@clerk/nextjs';

interface CollectionType extends OriginalCollectionType {
  accomplishedGoals?: number;
  totalGoals?: number;
  user: {
    username: string;
  };
}

const Collections =  () => {
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchAllCollectionsService();
      setIsLoading(true);
      console.log("API response", data);

      //  filtre les collections pour retirer celles de l'user connecté 
       const filteredCollections = data.data.filter((collection: CollectionType) => 
        collection.userId !== userId

      );
     setCollections(filteredCollections);
     setIsLoading(false);
     setIsFiltered(true); 

    };
    
    fetchData();
  }, [userId]);

  const collectionsData =
    collections?.map((collection) => ({
      ...collection,
      totalGoals: collection.goals?.length || 0,
      accomplishedGoals:
        collection.goals?.filter((goal: GoalType) => goal.isAccomplished).length || 0,
  })) || [];

  return (
    <>
      <PageTitle title='All collections' />
      {isLoading ? (
        <p>Loading...</p> 
      ) : (
        isFiltered && (
          <div>
            {collectionsData.map((collection: CollectionType) => (
              <div key={collection.id} className="flex">
                <p>
                  - {collection.label} by {collection.user.username} | {collection.accomplishedGoals} / {collection.totalGoals}
                </p>
                <button>♥</button>
              </div>
            ))}
          </div>
        )
      )}
    </>
  )
}

export default Collections