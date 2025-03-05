'use client';
import { CollectionType } from '@/types/types';
import { useState, useEffect } from 'react';
import fetchCollectionsData from '@/services/FetchCollectionsService'

interface SelectCollectionProps {
    collectionId: string | string[] | undefined,
    setCollectionId : React.Dispatch<React.SetStateAction<string>>
}

const SelectCollection: React.FC<SelectCollectionProps>= ({collectionId, setCollectionId}) => {
    const [collections, setCollections] = useState<[]>([]);

    const handleChange = ({target}: React.ChangeEvent<HTMLSelectElement>) => {
        setCollectionId(target.value);
    };

    useEffect(() => {
        
        if (collections.length === 0) {
            fetchCollectionsData().then(data => setCollections(data.data))
        }
    }, [collections]);
    
    return (
        <div className='flex flex-col items-start gap-4'>
            <label className='text-white text-2xl' htmlFor="label">Collection : </label>
            <select className='bg-[#142339] text-white py-3 px-2 rounded-md' name="goal-collection" id="goal-collection" value={collectionId} onChange={handleChange}>
            {collections.map((collection:CollectionType) => <option className='bg-[#142339] text-white' value={collection.id} key={collection.id} >{collection.label}</option>)}
            </select>
        </div>
    )

};

export default SelectCollection;