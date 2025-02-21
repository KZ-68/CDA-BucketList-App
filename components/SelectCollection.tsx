'use client';
import { CollectionType } from '@/types/types';
import { useState, useEffect } from 'react';

type SelectCollectionProps = {
    collectionId: string | string[] | undefined,
    setCollectionId : React.Dispatch<React.SetStateAction<string>>
}

const SelectCollection: React.FC<SelectCollectionProps >= ({collectionId, setCollectionId}) => {
    const [collections, setCollections] = useState<[]>([]);

    const handleChange = ({target}: React.ChangeEvent<HTMLSelectElement>) => {
        setCollectionId(target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/collections/`, {cache: 'force-cache'});
            const data = await res.json();
            setCollections(data.data);
        }
        if (collections.length === 0) {
            fetchData();
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