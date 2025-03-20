"use client";
import { CollectionType } from '@/types/types';
import Link from 'next/link';
import React, { useEffect } from 'react'

const Searchbar = () => {
    const { searchData, handleSearch, resultData } = useSearchData();

    return (
        <div className='relative flex flex-col w-full max-w-md'>
            <input
                type='search'
                value={searchData}
                onChange={handleSearch}
                placeholder="Search collections..."
                className='bg-gray-950 outline-none p-2 rounded w-full'
            />

            {/* Results dropdown with absolute positioning */}
            {resultData.length > 0 && (
                <div className='absolute top-full left-0 right-0 z-50 border border-gray-700 rounded overflow-hidden bg-gray-950 max-h-[300px] overflow-y-auto shadow-lg'>
                    {resultData.map((data: CollectionType) => (
                        <div key={data.id} className="p-2 hover:bg-gray-800 border-b border-gray-800 last:border-b-0">
                            <Link href={`/collections/${data.id}`} className="block w-full">
                                {data.label}
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function useSearchData() {
    const [searchData, setSearchData] = React.useState<string>('');
    const [resultData, setResultData] = React.useState<CollectionType[]>([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchData(e.target.value);
    }

    useEffect(() => {
        async function fetchData() {
            const baseUrl = process.env.NODE_ENV === 'development'
                ? 'http://localhost:3000'
                : 'https://cda-bucket-list-app.vercel.app';

            try {
                const response = await fetch(`${baseUrl}/api/collections/search?search=${searchData}`);
                const data = await response.json();

                if (data.success) {
                    setResultData(data.data);
                }

                console.log(data);
            } catch (error) {

            }
        }

        fetchData();
    }, [searchData])

    return { searchData, handleSearch, resultData };
}

export default Searchbar