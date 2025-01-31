'use client';
import { useEffect, useState } from 'react';
import { useAuth, useUser } from "@clerk/nextjs";

interface Collection {
    label: string;
    _count?: {
      goals: number;
    };
}

const CollectionsPage = () => {
    const [collections, setCollections] = useState<Collection[]>([]);
    const { userId } = useAuth(); 
    const { user } = useUser();
  
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
        <h1>Hello {user?.username || 'User'}</h1>
        <h2>MY COLLECTIONS: </h2>
  
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

