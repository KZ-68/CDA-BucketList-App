'use client';
import { CategoryType } from '@/types/types';
import { useState, useEffect } from 'react';
import fetchCategoriesData from '@/services/FetchCategoriesService';

interface SelectCategoryProps {
    categoryId: string;
    setCategoryId : React.Dispatch<React.SetStateAction<string>>;
}

const SelectCategory : React.FC<SelectCategoryProps> =  ({categoryId, setCategoryId} : SelectCategoryProps) => {
	const [categories, setCategories] = useState<[]>([]);

    const handleChange = ({target}: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryId(target.value);
    };

	useEffect(() => {
        if (categories.length === 0) {
            fetchCategoriesData().then(data => setCategories(data.data))
        }
    }, [categories]);
    
    return (
        <div className='flex flex-col items-start gap-4'>
            <label className='text-white text-2xl' htmlFor="label">Category : </label>
            <select className='bg-[#142339] text-white py-3 px-2 rounded-md' name="goal-category" id="goal-category" value={categoryId} onChange={handleChange}>
            {categories.map((category:CategoryType) => <option className='bg-[#142339] text-white' value={category.id} key={category.id} >{category.label}</option>)}
            </select>
        </div>
    )

};

export default SelectCategory;