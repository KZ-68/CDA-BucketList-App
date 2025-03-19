"use server"
import { auth } from '@clerk/nextjs/server'

export async function editCollection(
    formData:FormData,
    collectionId: string | string[] | undefined
) {
    const { userId } = await auth()
    let url = "";
    const autorization = process.env.VERCEL_TOKEN ? 'Bearer ' + process.env.VERCEL_TOKEN : ""

    if (!userId) return { success: false, message: 'User not authentified'};
    
    const collectionLabel = formData.get("collection-label") as string;
    const collectionisPrivate = formData.get("collection-isPrivate") ? false : true; 
   
    const bodyForm = ({
        label: collectionLabel,
        isPrivate : collectionisPrivate,
        userId: userId
    })

    if(process.env.NEXT_PUBLIC_VERCEL_ENV && process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
        url = "http://" + process.env.VERCEL_URL  + `/api/collections/${collectionId}`
    } else {
        url = process.env.NEXT_PUBLIC_URL + `/api/collections/${collectionId}`
    }
    
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(bodyForm),
        headers: {
            Autorization: autorization
        }
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