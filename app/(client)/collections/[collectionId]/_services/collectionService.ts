import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function isOwnerLogged(collecId: string) {
    "use server"
    const Auth = await auth();
    console.log("collecId :", collecId);

    const collection = await db.collection.findUnique({
        where: {
            id: collecId,
        }
    });
    console.log("collection :", collection);

    if (!collection) return false;

    const loggedUserId = Auth.userId;
    console.log("loggedUserId :", loggedUserId);
    if (!loggedUserId) return false;

    return collection?.userId === loggedUserId;
}

export async function fetchUserCollection(
    collectionId: string,
    byAccomplished?: string,
    sortBy?: string
) {
    const baseUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://cda-bucket-list-app.vercel.app';

    const response = await fetch(`${baseUrl}/api/collections/${collectionId}`);
    const data = await response.json();

    const totalGoalsCount = await db.goal.count({
        where: {
            collectionId: collectionId
        }
    });

    const goals = await db.goal.findMany({
        where: {
            collectionId: collectionId,
            isAccomplished: byAccomplished === 'done' ? true : false
        },
        include: {
            category: true
        },
        orderBy: {
            [typeof sortBy === "string" ? sortBy : "priority"]: 'desc'
        }
    });

    return { collection: data.data, goals, totalGoalsCount };
}

export async function fetchCategories() {
    const categories = await db.category.findMany();

    return { categories };
}

export async function createGoal(formData: FormData) {
    "use server"

    const label = formData.get('label')?.toString() || '';
    const categoryId = formData.get('categoryId')?.toString() || '';
    const description = 'None for now';
    const isAccomplished = false;
    const priority = 1;
    const collectionId = formData.get('collectionId')?.toString() || '';

    const goalData = { label, description, isAccomplished, priority, collectionId, categoryId };



    console.log("goalData :", goalData);

    const baseUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://cda-bucket-list-app.vercel.app';

    const response = await fetch(`${baseUrl}/api/goals`, {
        method: 'POST',
        body: JSON.stringify(goalData),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    console.log("data :", data.data);

}

export async function togglePrivacy(privacy: string, collectionId: string) {
    "use server";

    const isOwner = await isOwnerLogged(collectionId);
    if (!isOwner) return;

    await db.collection.update({
        where: {
            id: collectionId
        },
        data: {
            isPrivate: privacy === 'private' ? true : false
        }
    });
}

export async function toggleSort(
    sortType: string,
    currentSearchParams: {
        pathname: string,
        searchParams: URLSearchParams
    }
) {
    "use server";
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") || "";

    const searchParams = new URLSearchParams(currentSearchParams.searchParams);
    searchParams.set('sortBy', sortType);

    redirect(`${currentSearchParams.pathname}?${searchParams.toString()}`);
}

export async function toggleCollection(
    sortType: string,
    currentSearchParams: {
        pathname: string,
        searchParams: URLSearchParams
    }
) {
    "use server";
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") || "";

    const searchParams = new URLSearchParams(currentSearchParams.searchParams);
    searchParams.set('byAccomplished', sortType);

    redirect(`${currentSearchParams.pathname}?${searchParams.toString()}`);
}

export async function toggleGoal(goalId: string) {
    "use server"

    const currentGoal = await db.goal.findUnique({
        where: {
            id: goalId
        }
    });

    const isOwner = await isOwnerLogged(currentGoal?.collectionId || '');

    if (!isOwner) return;

    if (!currentGoal) return;

    await db.goal.update({
        where: {
            id: goalId
        },
        data: {
            isAccomplished: !currentGoal.isAccomplished
        }
    });
}
