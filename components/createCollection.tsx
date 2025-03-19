"use server"
import { auth } from '@clerk/nextjs/server'

export default async function createCollection(prevState: { success: boolean; message: string; } | Promise<{ success: boolean; message: string; } | null> | null, formData:FormData) {
    const { userId } = await auth()
    let url = "";
    const autorization = process.env.VERCEL_TOKEN ? 'Bearer ' + process.env.VERCEL_TOKEN : ""

    if (!userId) return { success: false, message: 'User not authentified'};

    prevState = null;
    
    const collectionLabel = formData.get("collection-label") as string;
    const collectionisPrivate = formData.get("collection-isPrivate") ? false : true; 
   

    const bodyForm = ({
        label: collectionLabel,
        isPrivate : collectionisPrivate,
        userId: userId
    })
    
    if(process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
        url = process.env.NEXT_PUBLIC_URL + `/api/collections`
    } else {
        url = "http://" + process.env.VERCEL_URL  + `/api/collections`
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
            message: 'Collection added successfully !',
        };
    } else {
        return {
            success: false,
            message: 'Error during the collection creation process',
        };
    }
}