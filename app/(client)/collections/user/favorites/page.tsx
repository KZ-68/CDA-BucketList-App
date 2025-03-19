'use client';
import { useEffect, useState } from 'react';
import { useAuth } from "@clerk/nextjs";
import PageTitle from "@/components/PageTitle";
import { redirect } from 'next/navigation';
import fetchCollectionsLiked from '@/services/FetchUserFavoriteCollectionsService'
import FetchAllCollectionsService from '@/services/FetchAllCollectionsService';
import { CollectionType, GoalType } from '@/types/types';
import AllCollectionItem from '@/components/AllCollectionItem';

interface CollectionLikedType extends CollectionType {
    accomplishedGoals?: number;
    totalGoals?: number;
    user: {
      username: string;
    };
}


const CollectionsPage = () => {
    const [collections, setCollections] = useState<CollectionLikedType[]>([]);
    const { isSignedIn, userId } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [likedCollections, setLikedCollections] = useState<string[]>([]);
  
    useEffect(() => {
        if (isSignedIn === false) redirect("/login");
        fetchCollectionsLiked(userId ? userId : null).then(
            data => {
                const likedIds = data.data.map((like: {collectionId : string}) => like.collectionId);
                setLikedCollections(likedIds);
            }
        )
        const fetchData = async () => {
            const data = await FetchAllCollectionsService();
            setIsLoading(true);
            setCollections(data.data);
            setIsLoading(false);
        };
          
        fetchData();
    }, [isSignedIn, userId]);

    const collectionsData = collections?.map((collection) => ({
        ...collection,
        totalGoals: collection.goals?.length || 0,
        accomplishedGoals:
        collection.goals?.filter((goal: GoalType) => goal.isAccomplished).length || 0,
    })) || [];

    const collectionsLikedData = collectionsData.filter((collectionData) => 
        likedCollections.includes(collectionData.id)
    );

    return (
        <>
          <PageTitle title='My Favorite Collections' />
            <div className='flex  flex-col gap-12 mb-16'>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className='flex flex-col gap-8'>
                {collectionsLikedData.map((collection: CollectionLikedType) => (
                    <div key={collection.id}>
                    {/* <button onClick={() => handleLike(collection.id)}>
                    {likedCollections.includes(collection.id) ? "♥" : "x"}
                    </button> */}
                    <AllCollectionItem
                    title= {collection.label}
                    userId= {collection.userId} 
                    username = {collection.user.username} 
                    numberGoals = {collection.totalGoals ?? 0}
                    isLiked={likedCollections.includes(collection.id)}
                    onLikeToggle={() => ""}
                    numberLikes={collection._count?.likes || 0}
                    goals={collection.goals?.map((goal: GoalType) => ({
                        label: goal.label,
                        id: goal.id,
                    })) || []}
                    />
                    </div>
                ))}
                </div>
            )}
            </div>
        </>
    )
}

export default CollectionsPage