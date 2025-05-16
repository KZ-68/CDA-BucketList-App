'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import PageTitle from "@/components/PageTitle";
import AllCollectionItem from "@/components/AllCollectionItem";
import { useUser } from '@clerk/nextjs';
import Link from "next/link";
import { MdRemoveRedEye } from "react-icons/md";
import Searchbar from '@/components/Searchbar';
import { GoalType } from '@/types/types';
import LikesFilter from '@/components/LikesFilter';
import useSWR from 'swr';
import FetchAllCollectionsService from '@/services/FetchAllCollectionsService';


interface Collection {
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

const fetcher = (url:string) => fetch(url).then((res) => res.json());

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filter, setFilter] = useState<string>('All');
  const [sortType, setSortType] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const { user } = useUser();
  const userId = user ? user.id : null;
  const [likedCollections, setLikedCollections] = useState<string[]>([]);
  const [collectionsLikedSorted, setCollectionsLikedSorted] = useState<Collection[]>([]);

  const dataCollection = FetchAllCollectionsService();
  const { data: datalikedCollections } = useSWR(`/api/user/${userId}/liked-collections`, fetcher);
  
  useEffect(() => {
    setIsLoading(true);
    if (dataCollection && datalikedCollections) {
      setCollections(dataCollection.data || []);
      const likedCollectionsIds = datalikedCollections.data.map((like: { collectionId: string }) => like.collectionId);
      setLikedCollections(likedCollectionsIds);
      setIsFiltered(true);
    }
    setIsLoading(false);
  }, [dataCollection, datalikedCollections]);

  const collectionsData = 
    collections?.map((collection) => ({
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
      <div className='mb-11'>
        <Searchbar />
      </div>
      <div className='text-lg mb-20'>
        <LikesFilter setCollectionsLikedSorted={setCollectionsLikedSorted} collections={sortedCollections} likedCollections={likedCollections} />
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
        <div className='flex flex-col gap-3'>
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
        isFiltered && (
          <div className='flex flex-col gap-8'>
            {collectionsLikedSorted.map((collection: Collection) => (
              <div key={collection.id}>
                {/* <button onClick={() => handleLike(collection.id)}>
                  {likedCollections.includes(collection.id) ? "♥" : "x"}
                  </button> */}
                <AllCollectionItem
                  title={collection.label}
                  userId={collection.userId}
                  username={collection.user.username}
                  numberGoals={collection.totalGoals ?? 0}
                  isLiked={likedCollections.includes(collection.id)}
                  onLikeToggle={() => handleLike(collection.id)}
                  numberLikes={collection._count?.likes || 0}
                  goals={collection.goals?.map((goal: GoalType) => ({
                    label: goal.label,
                    id: goal.id,
                  })) || []}
                />
              </div>
            ))}
          </div>
        )
      )}

      <div className='flex justify-end mt-20'>
        <Link href={`user/favorites`} className=''>
          <div className=' flex items-center gap-4 group'>
            <p className='opacity-80  group-hover:opacity-100 transition-all'>See my favorite collections </p>
            <div className='bg-accentColor rounded-full p-2 group-hover:bg-secondColor transition-all'>
              <MdRemoveRedEye className='text-2xl text-darkGrey' />
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}


export default Collections;
