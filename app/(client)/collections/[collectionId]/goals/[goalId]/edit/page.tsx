"use client"
import React, { useEffect, useState } from 'react'
import { CheckCircle2, XCircleIcon } from 'lucide-react';
import { editGoal } from "@/components/editGoal";
import { redirect, useParams } from 'next/navigation';
import SelectCategory from '@/components/SelectCategory';
import SelectCollection from '@/components/SelectCollection';
import { useUser } from '@clerk/nextjs';
import fetchGoalData from '@/services/FetchGoalService';

const EditGoalPage = () => {
    const params = useParams();
    const { isSignedIn } = useUser();
    if(isSignedIn === false) {
        redirect("/login");
    }

    const [label, setLabel] = useState("");
    const [description, setDescription] = useState<string | null>(null);
    const [priority, setPriority] = useState(0);
    const [categoryId, setCategoryId] = useState("");
    const [collectionId, setCollectionId] = useState("");

    const [isSubmited, setIsSubmited] = useState(false);
    
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const goalData = fetchGoalData(params.goalId);
    
    useEffect(() => {
        setLabel(goalData.data.label) 
        setDescription(goalData.data.description)
        setPriority(goalData.data.priority)
        setCategoryId(goalData.data.categoryId)
        setCollectionId(goalData.data.collectionId)
            
    }, [params.goalId, params.categoryId, goalData]);

    const handleChangeLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (label !== e.target.value) {
            setLabel(e.target.value);
        }
    };

    const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleChangePriority = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPriority(parseInt(e.target.value));
    };
    
    const handler = async (formData:FormData) => {
        setIsSubmited(true);
        const response = await editGoal(formData, params.goalId);
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
        <h1 className='text-2xl my-3 text-white'>Edit Goal</h1>
        <div className='flex flex-col my-6 py-8 px-6 mx-80 rounded-lg bg-[#22324c]'>
            <form className='flex flex-col gap-6 py-8 px-6 rounded-2xl' action={handler} id="signup-form">
                <label className='text-white text-2xl' htmlFor="label">Label : </label>
                <input className='bg-[#142339] text-white py-3 px-2 rounded-lg' value={label} onChange={handleChangeLabel} type='text' name="goal-label" id="goal-label" placeholder="Add a label..." />
                <label className='text-white text-2xl' htmlFor="label">Description : </label>
                <input className='bg-[#142339] text-white py-3 px-2 rounded-lg' value={description ? description : ""} onChange={handleChangeDescription} type='text-area' name="goal-description" id="goal-description" placeholder="Add a description..." />
                <label className='text-white text-2xl' htmlFor="label">Priority : </label>
                <input className='bg-[#142339] text-white py-3 px-2 rounded-lg' value={priority} onChange={handleChangePriority} type='number' min={0} max={255} name="goal-priority" id="goal-priority" placeholder="0" />
                <SelectCategory categoryId={categoryId} setCategoryId={setCategoryId} />
                <SelectCollection collectionId={collectionId} setCollectionId={setCollectionId} />
                <button className='py-2 px-2 rounded-lg bg-lime-200 text-black font-bold' type='submit'>Update</button>
            </form>
        </div>
        
    </>
    );
}

export default EditGoalPage