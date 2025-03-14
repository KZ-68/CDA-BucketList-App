'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import PageTitle from "@/components/PageTitle";
import AllCollectionItem from "@/components/AllCollectionItem";
import FetchAllCollectionsService from '@/services/FetchAllCollectionsService';
import FetchUserFavoriteCollectionsService from '@/services/FetchUserFavoriteCollectionsService';
import { CollectionType as OriginalCollectionType, GoalType } from "@/types/types";
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';


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
      <div>
        {isLoading ? (
          <p>Loading...</p> 
        ) : (
          isFiltered && (
            <div>
              {collectionsData.map((collection: CollectionType) => (
                <div key={collection.id} className="flex">
                  {/* <button onClick={() => handleLike(collection.id)}>
                  {likedCollections.includes(collection.id) ? "♥" : "x"}
                  </button> */}
                <AllCollectionItem
                  title= {collection.label} 
                  username = {collection.user.username} 
                  numberGoals = {collection.totalGoals ?? 0}
                  isLiked={likedCollections.includes(collection.id)}
                  onLikeToggle={() => handleLike(collection.id)}
                  />
                </div>
              ))}
            </div>
          )
        )}
      </div>

    </>
  )
}


export default Collections;
