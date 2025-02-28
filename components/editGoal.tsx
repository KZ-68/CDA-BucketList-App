"use server"
import { auth } from '@clerk/nextjs/server'

export async function editGoal(
    formData:FormData,
    goalId: string | string[] | undefined,
) {
    const { userId } = await auth()

    if (!userId) return { success: false, message: 'User not authentified'};
    
    const goalLabel = formData.get("goal-label") as string;
    const goalDescription = formData.get("goal-description") as string;
    const goalPriority = parseInt((formData.get('goal-priority') as string));
    const goalCategory = formData.get("goal-category") as string;
    const goalCollection = formData.get("goal-collection") as string;
    const goalIsAccomplished = formData.get("goal-isAccomplished") ? true : false;
   
    const bodyForm = ({
        label: goalLabel,
        description : goalDescription,
        priority : goalPriority,
        isAccomplished: goalIsAccomplished,
        categoryId: goalCategory,
        collectionId: goalCollection,
        userId: userId
    })
    
    const response = await fetch(process.env.URL + `/api/goals/${goalId}`, {
        method: 'POST',
        body: JSON.stringify(bodyForm),
    })

    if(response.ok) {
        return {
            success: true,
            message: 'Goal updated successfully !',
        };
    } else {
        return {
            success: false,
            message: 'Error during the update process',
        };
    }
}