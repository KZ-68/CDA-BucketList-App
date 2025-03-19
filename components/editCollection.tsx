"use server"
import { auth } from '@clerk/nextjs/server'

export async function editCollection(
    formData:FormData,
    collectionId: string | string[] | undefined
) {
    const { userId } = await auth()

    if (!userId) return { success: false, message: 'User not authentified'};
    
    const collectionLabel = formData.get("collection-label") as string;
    const collectionisPrivate = formData.get("collection-isPrivate") ? false : true; 
   
    const bodyForm = ({
        label: collectionLabel,
        isPrivate : collectionisPrivate,
        userId: userId
    })
    
    const response = await fetch(process.env.NEXT_PUBLIC_URL + `/api/collections/${collectionId}`, {
        method: 'POST',
        body: JSON.stringify(bodyForm),
    })

    if(response.ok) {
        return {
            success: true,
            message: 'Collection updated successfully !',
        };
    } else {
        return {
            success: false,
            message: 'Error during the update process',
        };
    }
}