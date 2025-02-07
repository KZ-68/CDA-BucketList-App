'use client';
import { useEffect, useState } from 'react';

interface Collection {
  label: string;
  _count?: {
    goals: number;
  };
}
type Props = {
  params: Promise<{ userId: string }>
}

const CollectionsPage = ({ params }: Props)  => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
        const fetchUserId = async () => {
          const resolvedParams = await params;
          setUserId(resolvedParams.userId); 
        };
        
        fetchUserId();
  }, [params]); 


    useEffect(() => {
      const fetchCollections = async () => {
  
        try {
          const response = await fetch(`/api/collections/user/${userId}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          setCollections(data.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des collections :", error);
        }
      };

    fetchCollections();
  }, [params, userId]);

  return (
    <>
      <h1>COLLECTIONS:  </h1>

      <div>
        {collections.length === 0 ? (
          <p>No collections found.</p>
        ) : (
          collections.map((collection, index) => (
            <div key={index} className='flex'>
              <h3>{collection.label} : </h3>
              <span>({collection._count?.goals || 0} goals)</span>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default CollectionsPage;
