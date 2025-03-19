"use server"
import { auth } from '@clerk/nextjs/server'

export async function createGoal(
    formData:FormData
) {
    const { userId } = await auth()

    if (!userId) return { success: false, message: 'User not authentified'};
    
    const goalLabel = formData.get("goal-label") as string;
    const goalDescription = formData.get("goal-description") as string;
    const goalPriority = parseInt((formData.get('goal-priority') as string));
    const goalCategory = formData.get("goal-category") as string;
    const goalCollection = formData.get("goal-collection") as string;

    const bodyForm = ({
        label: goalLabel,
        description : goalDescription,
        priority : goalPriority,
        isAccomplished: false,
        categoryId: goalCategory,
        collectionId: goalCollection,
        userId: userId
    })
    
    const apiURL = process.env.VERCEL_ENV && process.env.VERCEL_ENV === "preview" ? process.env.VERCEL_URL : process.env.NEXT_PUBLIC_API_URL;
    const autorization = process.env.VERCEL_ENV && process.env.VERCEL_ENV === "preview" ? `Bearer ${process.env.VERCEL_TOKEN}` : ""
    
    const response = await fetch(`${apiURL}/api/goals`, {
        method: 'POST',
        headers: {
            "Content-Type":"application/json",
            x_authorization: autorization,
        },
        body: JSON.stringify(bodyForm),
        
    })

    if(response.ok) {
        return {
            success: true,
            message: 'Goal added successfully !',
        };
    } else {
        return {
            success: false,
            message: 'Error during the goal creation process',
        };
    }
}