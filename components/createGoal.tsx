"use server"
import { auth } from '@clerk/nextjs/server'

export async function createGoal(
    formData:FormData,
    collectionId: string | string[] | undefined
) {
    const { userId } = await auth()

    if (!userId) return { success: false, message: 'User not authentified'};
    
    const goalLabel = formData.get("goal-label") as string;
    const goalDescription = formData.get("goal-description") as string;
    const goalPriority = parseInt((formData.get('goal-priority') as string));
    const goalCategory = formData.get("goal-category") as string;

    const bodyForm = ({
        label: goalLabel,
        description : goalDescription,
        priority : goalPriority,
        isAccomplished: false,
        categoryId: goalCategory,
        collectionId: collectionId,
        userId: userId
    })
    
    const response = await fetch(process.env.URL + `/api/goals`, {
        method: 'POST',
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