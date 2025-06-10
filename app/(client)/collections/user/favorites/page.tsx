'use client';
import { useEffect, useState } from 'react';
import { useAuth } from "@clerk/nextjs";
import PageTitle from "@/components/PageTitle";
import fetchCollectionsLiked from '@/services/FetchUserFavoriteCollectionsService'
import FetchAllCollectionsService from '@/services/FetchAllCollectionsService';
import { GoalType } from '@/types/types';
import AllCollectionItem from '@/components/AllCollectionItem';

interface CollectionLikedType {
    id: string;
    label: string
    isPrivate: boolean;
    accomplishedGoals?: number;
    totalGoals?: number;
    user: {
        username: string;
    };
    createdAt: number;
    goals: GoalType[];
    userId: string;
    _count: {
        likes: number;
    };
}

const CollectionsPage = () => {
    const [collections, setCollections] = useState<CollectionLikedType[]>([]);
    const { isSignedIn, userId } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<string>('All');
    const [sortType, setSortType] = useState<string>('date');
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [likedCollections, setLikedCollections] = useState<string[]>([]);
    
    const dataAllCollections = FetchAllCollectionsService();
    const datalikedCollections = fetchCollectionsLiked(userId ? userId : null);

    useEffect(() => {
         
        
        if(datalikedCollections) {
            setLikedCollections(datalikedCollections.data.map((like: {collectionId : string}) => like.collectionId));
        }
        
        const fetchData = () => {
            setIsLoading(true);
            if(dataAllCollections) {
                setCollections(dataAllCollections.data);
            }
            setIsLoading(false);
        };
          
        fetchData();
    }, [isSignedIn, userId, dataAllCollections, datalikedCollections]);

    const collectionsData = collections?.map((collection) => ({
        ...collection,
        totalGoals: collection.goals?.length || 0,
        accomplishedGoals:
        collection.goals?.filter((goal: GoalType) => goal.isAccomplished).length || 0,
    })) || [];

    const filteredCollections = collectionsData.filter((collection) => {
        const totalGoals = collection.totalGoals;
        if (filter === 'All') return true;
        if (filter === 'Completed') return totalGoals > 0 ? collection.goals.every((goal) => goal.isAccomplished === true) : "";
        if (filter === 'In Progress') return collection.accomplishedGoals > 0 && collection.accomplishedGoals < totalGoals;
        if (filter === 'Not Started') return collection.goals.every((goal) => goal.isAccomplished === false);
      });
    
      const formatDateToNumber = (timestamp: number) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return year * 10000 + month * 100 + day;
      };
      
      const sortedCollections = [...filteredCollections].sort((a, b) => {
        if (sortType === 'date') {
          const yearA = formatDateToNumber(a.createdAt);
          const yearB = formatDateToNumber(b.createdAt);
          console.log('yearA:', yearA);
          return sortOrder === 'desc' ? yearB - yearA : yearA - yearB;
        }
        if (sortType === 'goals') {
          return sortOrder === 'desc' ? b.goals.length - a.goals.length : a.goals.length - b.goals.length;
        }
        if (sortType === 'completion') {
          return sortOrder === 'desc' ? b.accomplishedGoals - a.accomplishedGoals : a.accomplishedGoals - b.accomplishedGoals;
        }
        return 0;
      });

    const collectionsLikedData = sortedCollections.filter((collectionData) => 
        likedCollections.includes(collectionData.id)
    );

    return (
        <>
            <PageTitle title='My Favorite Collections' />
            <div className='flex  flex-col gap-12 mb-16'>
                <div className='flex flex-col gap-3 mb-6 '>
                    <p>State :</p>
                    
                    <div className='flex gap-2 flex-wrap'>
                        <p
                            className={`bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base cursor-pointer hover:border-accentColor hover:text-accentColor ${filter === 'Completed' ? 'border-accentColor text-accentColor' : ''}`}
                            onClick={() => setFilter('Completed')}
                        >
                            Completed
                        </p>
                        <p
                            className={`bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base cursor-pointer hover:border-accentColor hover:text-accentColor ${filter === 'In Progress' ? 'border-accentColor text-accentColor' : ''}`}
                            onClick={() => setFilter('In Progress')}
                        >
                            In Progress
                        </p>
                        <p
                            className={`bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base cursor-pointer hover:border-accentColor hover:text-accentColor ${filter === 'Not Started' ? 'border-accentColor text-accentColor' : ''}`}
                            onClick={() => setFilter('Not Started')}
                        >
                            Not Started
                        </p>
                        <p
                            className={`bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base cursor-pointer hover:border-accentColor hover:text-accentColor ${filter === 'All' ? 'border-accentColor text-accentColor' : ''}`}
                            onClick={() => setFilter('All')}
                        >
                            All
                        </p>
                    </div>
                
                    <div className='flex flex-col gap-3  '>
                        <p>Sort by :</p>
                        <div className='flex gap-2 flex-wrap'>
                            <div>
                                <p>Date</p>
                                <select 
                                value={sortType === 'date' ? sortOrder : ''} 
                                onChange={(e) => {
                                    setSortType('date');
                                    setSortOrder(e.target.value);
                                }} 
                                className='bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base'
                                >
                                <option value="">Select...</option>
                                <option value="desc">New → Old</option>
                                <option value="asc">Old → New</option>
                                </select>
                            </div>
                            
                            <div>
                                <p>Goals</p>
                                <select 
                                value={sortType === 'goals' ? sortOrder : ''} 
                                onChange={(e) => {
                                    setSortType('goals');
                                    setSortOrder(e.target.value);
                                }} 
                                className='bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base'
                                >
                                <option value="">Select...</option>
                                <option value="desc">High → Low</option>
                                <option value="asc">Low → High </option>
                                </select>
                            </div>

                            <div>
                                <p>Completion</p>
                                <select 
                                value={sortType === 'completion' ? sortOrder : ''} 
                                onChange={(e) => {
                                    setSortType('completion');
                                    setSortOrder(e.target.value);
                                }} 
                                className='bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base'
                                >
                                <option value="">Select...</option>
                                <option value="desc">High → Low</option>
                                <option value="asc">Low → High</option>
                                </select>
                            </div>

                            <div className='cursor-pointer'>
                                <p className='text-mediumGrey'>Reset</p>
                                <p onClick={() => {
                                setSortType('date');
                                setSortOrder('desc');
                                }} className='bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base'>
                                Reset
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
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