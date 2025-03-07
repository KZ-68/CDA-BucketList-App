import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function isOwnerLogged(collecId: string) {
    const Auth = await auth();
    const { collection } = await fetchUserCollection(collecId);

    const loggedUserId = Auth.userId;
    if (!loggedUserId) return false;

    return collection.userId === loggedUserId;
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

    const isOwner = await isOwnerLogged(goalId);
    if (!isOwner) return;

    const currentGoal = await db.goal.findUnique({
        where: {
            id: goalId
        }
    });

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
