'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import PageTitle from "@/components/PageTitle";
import FetchAllCollectionsService from '@/services/FetchAllCollectionsService';
import FetchUserFavoriteCollectionsService from '@/services/FetchUserFavoriteCollectionsService';
import { CollectionType as OriginalCollectionType, GoalType } from "@/types/types";
import { useAuth } from '@clerk/nextjs';


interface CollectionType extends OriginalCollectionType {
  accomplishedGoals?: number;
  totalGoals?: number;
  user: {
    username: string;
  };
}

const collections =  () => {
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);
  const { userId } = useAuth();
  const [likedCollections, setLikedCollections] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchLikedCollections = async () => {
      if (!userId) return;

      // const response = await fetch(`/api/user/${userId}/likedCollections`);
      // const data = await response.json();
      const data = await FetchUserFavoriteCollectionsService(userId);
      console.log("Liked collections:", data);

      // extraire uniquement les collectionId
      const likedIds = data.data.map((like: { collectionId: string }) => like.collectionId);
      setLikedCollections(likedIds);
    };

    fetchLikedCollections();
  }, [userId]);


  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchAllCollectionsService();
      setIsLoading(true);
      console.log("API response", data);

      //  filtre les collections pour retirer celles de l'user connecté 
      // const filteredCollections = data.data.filter((collection: CollectionType) => 
      // collection.userId !== userId
      // );

     setCollections(data.data);
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


  async function handleLike(collectionId: string) {
    const response = await fetch('/api/collections/all', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        collectionId: collectionId,
      }),
    });

    const data = await response.json();
    console.log(data);
    // Mise à jour locale de l'état pour éviter le refresh
    setLikedCollections((prevLiked) =>
      prevLiked.includes(collectionId)
        ? prevLiked.filter((id) => id !== collectionId) // Retirer si déjà liké
        : [...prevLiked, collectionId] // ajouter si c'est pas le cas
    );
  }

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
                <button onClick={() => handleLike(collection.id)}>
                {likedCollections.includes(collection.id) ? "♥" : "x"}
              </button>
                {/* <p>is liked ? </p> */}
              </div>
            ))}
          </div>
        )
      )}
    </>
  )
}

export default collections