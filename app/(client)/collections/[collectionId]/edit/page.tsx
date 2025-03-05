"use client"
import React, { useEffect, useState } from 'react'
import { CheckCircle2, XCircleIcon } from 'lucide-react';
import { editCollection } from "@/components/editCollection";
import { useParams } from 'next/navigation';
import fetchCollectionData from '@/services/FetchCollectionService';

const EditCollectionPage = () => {
    const params = useParams();
    const [label, setLabel] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);

    const [isSubmited, setIsSubmited] = useState(false);
    
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchCollectionData(params.collectionId).then(
            data => (setLabel(data.data.label), setIsPrivate(data.data.isPrivate)), 
        )
    }, [params.collectionId]);

    const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPrivate(e.target.checked);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLabel(e.target.value);
    };

    const handler = async (formData:FormData) => {
        setIsSubmited(true);
        const response = await editCollection(formData, params.collectionId);
        setSuccess(response.success);
        setMessage(response.message);
    }

    return (
    <>
        {isSubmited && success === true && (
            <p id="success" className='flex flex-row gap-2 bg-white w-fit py-2 px-3 my-3 text-black rounded-md'><CheckCircle2 className='flex flex-row gap-2 text-white bg-green-700 rounded-full'/>{message}</p>
        )}
        {isSubmited && success === false && (
            <p id="error" className='flex flex-row gap-2 bg-white w-fit py-2 px-3 my-3 text-black rounded-md'><XCircleIcon className='text-white bg-red-600 rounded-full'/>{message}</p>
        )}
        <h1 className='text-2xl my-3 text-white'>Edit Collection</h1>
        <div className='flex flex-col my-6 py-8 px-6 mx-80 rounded-lg bg-slate-800'>
            <form className='flex flex-col gap-6 py-8 px-6 rounded-2xl' action={handler} id="signup-form">
                <label className='text-white text-2xl' htmlFor="label">Label : </label>
                <input className='bg-[#142339] text-white py-3 px-2 rounded-lg' value={label} onChange={handleChange} type='text' name="collection-label" id="collection-label" placeholder="Add a label..." />
                <div className="flex items-center justify-center w-full my-8">
                    <label htmlFor="toggle" className="flex items-center cursor-pointer relative">
                        <input type="checkbox" id="toggle" checked={isPrivate} onChange={onChangeCheckBox} className="sr-only peer" name='collection-isPrivate'/>
                        <div className="w-[200px] h-7 flex items-center bg-[#28344c] rounded-lg text-[12px] peer-checked:text-[#30c4e4] text-[#30c4e4] font-extrabold after:flex after:items-center after:justify-center peer after:content-['Public'] peer-checked:after:content-['Private'] peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-[#081424] after:bg-[#081424] after:border after:border-[#081424] after:rounded-lg after:h-6 after:w-24 after:transition-all peer-checked:bg-[#081424]">
                            <span className='text-white mx-7'>Public</span>
                            <span className='text-white mx-7'>Private</span>
                        </div>
                    </label>
                </div>
                <button className='py-2 px-2 rounded-lg bg-lime-200 text-black font-bold' type='submit'>Update</button>
            </form>
        </div>
        
    </>
    );
}

export default EditCollectionPage