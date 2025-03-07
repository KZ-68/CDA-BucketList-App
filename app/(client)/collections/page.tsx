'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import PageTitle from "@/components/PageTitle";
import FetchCollectionsService from '@/services/FetchCollectionsService';
import { CollectionType } from "@/types/types";


const collections =  () => {
  const [collections, setCollections] = useState<CollectionType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchCollectionsService();
      console.log("Données reçues:", data);
      setCollections(data.data);
    };
    
    fetchData();
  }, []);

  console.log("all collections", collections);

  return (
    <>
      <PageTitle title='All collections' />

      <div>
        {collections?.map(collection => (
          <p key={collection.id}>{collection.label}</p>
        ))}
      </div>
    </>
  )
}

export default collections