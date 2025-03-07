'use client';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import fetchUserCollectionsData from '@/services/FetchUserCollectionService'

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
  const { isSignedIn } = useUser();
  if(isSignedIn === false) {
      redirect("/login");
  }
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
    fetchUserCollectionsData(userId).then(data => setCollections(data.data))
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
