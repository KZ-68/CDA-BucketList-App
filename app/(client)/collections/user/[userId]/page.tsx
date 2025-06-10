'use client';
import { useAuth } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import fetchUserCollectionsData from '@/services/FetchUserCollectionService'
import CollectionItem from '@/components/CollectionItem';
import getUserInformationService from '@/services/GetUserInformationsService';
import PageTitle from '@/components/PageTitle';

interface UserCollection {
  id: string;
  label: string;
  isPrivate : boolean;
  createdAt: number;
  accomplishedGoals: number;
  goals: Goal[];
  _count: {
    goals:number;
  }
}

interface Goal {
  id: string;
  isAccomplished: boolean;
}

const CollectionsPage = ()  => {
  const params = useParams<{userId:string}>();
  const [collections, setCollections] = useState<UserCollection[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [sortType, setSortType] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [username, setUsername] = useState<string | null>('unknown');
  const { isSignedIn } = useAuth();
  
  const userCollections = fetchUserCollectionsData(params.userId)

  useEffect(() => {
     
    if(userCollections){
      setCollections(userCollections.data || [])      
    }
     
    getUserInformationService(params.userId).then(
      username => {
        setUsername(username)
      }
    );
  }, [isSignedIn, params.userId, username, userCollections]);

  const filteredCollections = collections.filter((collection) => {
    const totalGoals = collection.goals.length;
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

  return (
    <>
      <PageTitle title={`${username?.toLocaleUpperCase()}` + "'S COLLECTIONS:"} />
      <div className='text-lg mb-20'>
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

        <div className='flex  flex-col gap-12 mb-16'>
          {collections.length === 0 ? (
            <p>Loading...</p>
          ) : (
            sortedCollections.map((collection : UserCollection, index: number) => (
              <div key={collection.label || index} className='flex flex-col'>
                <CollectionItem 
                  label = {collection.label}
                  totalGoal = {collection._count?.goals || 0}
                  achievedGoal= {collection.accomplishedGoals}
                  isPrivate = {collection.isPrivate} 
                  id = {collection.id}/>
              </div>
            ))
          )}
        </div>
    </>
  );
};

export default CollectionsPage;
