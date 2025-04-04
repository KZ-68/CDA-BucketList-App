"use client";
import { CollectionType } from '@/types/types';
import Link from 'next/link';
import React, { useEffect, KeyboardEvent } from 'react'

const Searchbar = () => {
    const { searchData, handleSearch, resultData, focusedIndex, setFocusedIndex, handleKeyDown } = useSearchData();

    return (
        <div className='relative flex flex-col w-full max-w-md'>
            <input
                type='search'
                value={searchData}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                placeholder="Search collections..."
                className='bg-gray-950 outline-none p-2 rounded w-full'
                aria-expanded={resultData.length > 0}
                aria-controls="search-results"
                role='combobox'
            />

            {resultData.length > 0 ? (
                <div id="search-results" className='absolute top-full left-0 right-0 z-50 border border-gray-700 rounded overflow-hidden bg-gray-950 max-h-[300px] overflow-y-auto shadow-lg'>
                    {resultData.map((data: CollectionType, index: number) => (
                        <div 
                            key={data.id} 
                            className={`p-2 hover:bg-gray-800 border-b border-gray-800 last:border-b-0 ${
                                index === focusedIndex ? 'bg-gray-800' : ''
                            }`}
                            onMouseEnter={() => setFocusedIndex(index)}
                        >
                            <Link 
                                href={`/collections/${data.id}`} 
                                className="block w-full"
                                tabIndex={index === focusedIndex ? 0 : -1}
                            >
                                {data.label}
                            </Link>
                        </div>
                    ))}
                </div>
            ) : searchData !== '' ? (
                <div className='absolute top-full left-0 right-0 z-50 border border-gray-700 rounded overflow-hidden bg-gray-950 max-h-[300px] overflow-y-auto shadow-lg'>
                    <div className="p-2 hover:bg-gray-800 border-b border-gray-800 last:border-b-0">
                        <p className="block w-full">
                            No results
                        </p>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

function useSearchData() {
    const [searchData, setSearchData] = React.useState<string>('');
    const [resultData, setResultData] = React.useState<CollectionType[]>([]);
    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchData(e.target.value);
        setFocusedIndex(-1);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (resultData.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocusedIndex(prev => 
                    prev < resultData.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex(prev => 
                    prev > 0 ? prev - 1 : prev
                );
                break;
            case 'Enter':
                if (focusedIndex >= 0) {
                    window.location.href = `/collections/${resultData[focusedIndex].id}`;
                }
                break;
        }
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
                console.error(error);
            }
        }

        fetchData();
    }, [searchData])

    return { 
        searchData, 
        handleSearch, 
        resultData, 
        focusedIndex, 
        setFocusedIndex, 
        handleKeyDown 
    };
}

export default Searchbar