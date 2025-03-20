import { GoalType } from "@/types/types";
import { useEffect, useState } from "react";

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

interface LikesFilterProps {
    collections: Collection[];
    likedCollections: string[];
    setCollectionsLikedSorted:React.Dispatch<React.SetStateAction<Collection[]>>;
}
 
const LikesFilter: React.FC<LikesFilterProps> = ({setCollectionsLikedSorted, collections, likedCollections}) => {
    const [likeFilter, setLikeFilter] = useState<string>('All');
    useEffect(()=> {
        const collectionsLikeFiltered = collections.filter((collection) => {
            if (likeFilter === 'Liked') return likedCollections.includes(collection.id);
            if (likeFilter === 'Not liked') return !likedCollections.includes(collection.id)
            if (likeFilter === 'All') return true;
        })
        setCollectionsLikedSorted((prev) => {
            // Vérifie si la nouvelle valeur est différente avant de setter l’état
            if (JSON.stringify(prev) !== JSON.stringify(collectionsLikeFiltered)) {
              return collectionsLikeFiltered;
            }
            return prev;
        })
    },[collections, likeFilter, likedCollections, setCollectionsLikedSorted])
    return (  
        <div className="flex my-4 gap-2">
            <div className='flex gap-2 flex-wrap bg-[--accentColor] rounded-xl'>
              <p
                  className={`bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base cursor-pointer hover:border-accentColor ${likeFilter === 'Liked' ? 'border-[--accentColor] bg-[--accentColor] text-darkGrey font-bold' : ''}`}
                  onClick={() => {setLikeFilter('Liked')}}
              >
                  Liked
              </p>
              <p
                  className={`bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base cursor-pointer hover:border-accentColor ${likeFilter === 'Not liked' ? 'border-[--accentColor] bg-[--accentColor] text-darkGrey font-bold' : ''}`}
                  onClick={() => {setLikeFilter('Not liked')}}
              >
                  Not liked
              </p>
              <p
                  className={`bg-darkGrey border border-solid border-neutralWhite px-5 py-2 rounded-md text-base cursor-pointer hover:border-accentColor ${likeFilter === 'All' ? 'border-[--accentColor] bg-[--accentColor] text-darkGrey font-bold' : ''}`}
                  onClick={() => {setLikeFilter('All')}}
              >
                  All
              </p>
            </div>
        </div>
    );
}
 
export default LikesFilter;