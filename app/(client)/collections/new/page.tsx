"use client"
import React, { useActionState } from 'react'
import { CheckCircle2, XCircleIcon } from 'lucide-react';
import { createCollection } from "@/components/createCollection";
import RedirectionHook from '@/components/RedirectionHook';

const NewCollectionPage = () => {

     
  
    const [formState, formAction] = useActionState(createCollection, null);

    return (
    <>
        {formState?.success === true && (
            <div id="success" className='flex flex-row gap-2 bg-white w-fit py-2 px-3 my-3 rounded-md'><CheckCircle2 className='flex flex-row gap-2 text-white bg-green-700 rounded-full'/>
                <p className='text-black'>{formState?.message}</p>
                <RedirectionHook url={`/collections/user`}/>
            </div>
        )}
        {formState?.success === false && (
            <div id="error" className='flex flex-row gap-2 bg-white w-fit py-2 px-3 my-3 rounded-md'><XCircleIcon className='text-white bg-red-600 rounded-full'/>
                <p className='text-black'>{formState?.message}</p>
                <RedirectionHook url={`/collections/user`}/>
            </div>
        )}
        <h1 className='text-2xl my-3 text-white'>New Collection</h1>
        <div className='flex flex-col my-6 py-8 px-6 mx-80 rounded-lg bg-[#22324c]'>
            <form className='flex flex-col gap-6 py-8 px-6 rounded-2xl' action={formAction} id="signup-form">
                <label className='text-white text-2xl' htmlFor="label">Label : </label>
                <input className='bg-[#142339] text-white py-3 px-2 rounded-lg' type='text' name="collection-label" id="collection-label" placeholder="Add a label..." />
                <div className="flex items-center justify-center w-full my-8">
                    <label htmlFor="toggle" className="flex items-center cursor-pointer relative">
                        <input type="checkbox" id="toggle" className="sr-only peer" name='collection-isPrivate'/>
                        <div className="w-[193px] h-7 flex items-center bg-[#28344c] border-[2px] border-[#081424] rounded-lg text-[12px] peer-checked:text-[#30c4e4] text-[#30c4e4] font-extrabold after:flex after:items-center after:justify-center peer after:content-['Public'] peer-checked:after:content-['Private'] peer-checked:after:translate-x-full after:absolute after:left-[0px] peer-checked:after:border-[#081424] after:bg-[#081424] after:border after:border-[#081424] after:rounded-lg after:h-6 after:w-24 after:transition-all peer-checked:bg-[#28344c] peer-checked:border-[#081424]">
                            <span className='text-white mx-7'>Public</span>
                            <span className='text-white mx-6'>Private</span>
                        </div>
                    </label>
                </div>
                <button className='py-2 px-2 rounded-lg bg-lime-200 text-black font-bold' type='submit'>Add</button>
            </form>
        </div>
        
    </>
    );
}

export default NewCollectionPage