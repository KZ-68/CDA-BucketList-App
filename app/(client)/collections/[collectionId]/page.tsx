import { CollectionType, GoalType } from "@/types/types";
import { db } from "@/lib/db";
import { SingleGoal } from "./_components/SingleGoal";
import RoundPlus from "/public/add.svg";
import Image from "next/image";
import { Divider } from "./_components/Divider";
import { TogglePrivacy } from "./_components/TogglePrivacy";
import { redirect } from "next/navigation";
import { SortElement } from "./_components/SortElement";
import { headers } from "next/headers";
import { ToggleAccomplish } from "./_components/ToggleAccomplish";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";

interface fetchResponse {
    collection: CollectionType,
    goals: GoalType[],
    totalGoalsCount: number
}

interface PageProps {
    params: Promise<{ collectionId: string }>
    searchParams: Promise<{ sortBy: string, byAccomplished: string }>
}

interface DynamicProps {
    params: Promise<{ collectionId: string }>
}


export async function generateMetadata(
    { params }: DynamicProps
): Promise<Metadata> {
    // read route params
    const collectionId = (await params).collectionId

    // fetch data
    const { collection } = await fetchUserCollection(collectionId);

    return { title: collection.label }
}

async function isOwnerLogged(collecId: string) {
    const Auth = await auth();
    const { collection } = await fetchUserCollection(collecId) as fetchResponse;

    const loggedUserId = Auth.userId;
    console.log("loggedUSer : ", loggedUserId);

    if (!loggedUserId) return false;
    
    const isOwner = collection.userId === loggedUserId;
    
    console.log("isOwner : ", isOwner);
    return isOwner;
}

const Page = async ({ params, searchParams }: PageProps) => {
    // const { userId } = await auth();

    // if (!userId) {
    //     return <div>Sign in to view this page</div>
    // }

    // const user = await currentUser();


    const { collectionId } = await params;
    const { byAccomplished, sortBy } = await searchParams;

    const { collection, goals, totalGoalsCount } = await fetchUserCollection(collectionId, byAccomplished, sortBy) as fetchResponse;

    const accomplishedGoals = goals.reduce((acc, goal) => acc + (goal.isAccomplished ? 1 : 0), 0);

    const isOwner = await isOwnerLogged(collectionId);
    console.log("isOwner : ", isOwner);
    
    return (
        <div className=" flex flex-col justify-center items-center bg-[#22324C]">            
            <div>
                {
                    !isOwner &&
                    <p className="text-[#ffaa29] pb-12">
                        Warning ! Your are not the owner of this collection no edit can be made
                    </p>
                }
            </div>
            <h1 className="text-5xl text-center">{collection.label}</h1>

            <div
                className="
                    w-32 h-8
                    my-4 
                    flex flex-row justify-center items-center text-center
                    bg-slate-800 
                    border-[#C6E8AA] rounded-md border-2"
            >
                <ToggleAccomplish isAccomplished ToggleCollection={ToggleCollection} />
            </div>

            <div className="flex flex-row gap-4 justify-center items-center">
                <SortElement
                    toggleSort={toggleSort}
                />
            </div>

            <div className="flex flex-row gap-4">
                <div className="flex flex-row items-center gap-4 p-4">
                    <Image
                        src={RoundPlus}
                        alt="Round plus icon"
                        height={33}
                        className='select-none'
                    />
                    <p className="text-[rgba(255,255,255,0.7)]">New goal</p>
                </div>

                <div className="flex flex-row items-end gap-4 px-4 pt-4">
                    <p className="font-bold text-xl">
                        {accomplishedGoals}/
                        <span className="text-[#C6E8AA]">{totalGoalsCount}</span>
                    </p>
                    <p>Goals</p>
                </div>
            </div>

            <Divider color="#ffffff" />

            <div className="flex flex-row w-36 justify-center items-center text-center my-4 rounded-md bg-slate-800 border-[#071427] border-2">
                <TogglePrivacy collection={collection} togglePrivacy={FetchTogglePrivacy} />
            </div>

            {goals.map((goal) =>
                <SingleGoal goal={goal} isOwner={isOwner} key={goal.id} fetchToggleGoal={fetchToggleGoal} />
            )}
        </div>
    )
}

export default Page;

async function fetchUserCollection(
    collectionId: string,
    byAccomplished?: string,
    sortBy?: string
) {
    const baseUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://cda-bucket-list-app.vercel.app';

    const response = await fetch(`${baseUrl}/api/collections/${collectionId}`);

    const data = await response.json();

    // Get total goals count for the collection
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

async function FetchTogglePrivacy(privacy: string, collectionId: string) {
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

    return;
}

async function toggleSort(
    sortType: string,
    currentSearchParams: {
        pathname: string,
        searchParams: URLSearchParams
    }
) {
    "use server";
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") || "";

    // Either use passed currentSearchParams or get from current URL
    const searchParams = new URLSearchParams(currentSearchParams.searchParams);
    searchParams.set('sortBy', sortType);

    const fullPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
    console.log("fullpath : ", fullPath);
    redirect(`${currentSearchParams.pathname}?${searchParams.toString()}`);
}

async function ToggleCollection(
    sortType: string,
    currentSearchParams: {
        pathname: string,
        searchParams: URLSearchParams
    }
) {
    "use server";
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") || "";

    // Either use passed currentSearchParams or get from current URL
    const searchParams = new URLSearchParams(currentSearchParams.searchParams);
    searchParams.set('byAccomplished', sortType);

    const fullPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
    console.log("fullpath : ", fullPath);
    redirect(`${currentSearchParams.pathname}?${searchParams.toString()}`);
}

async function fetchToggleGoal(goalId: string) {
    "use server"
    
    const isOwner = await isOwnerLogged(goalId);

    if (!isOwner) return;

    const currentGoal = await db.goal.findUnique({
        where: {
            id: goalId
        }
    });

    if (!currentGoal) return;


    const goal = await db.goal.update({
        where: {
            id: goalId
        },
        data: {
            isAccomplished: !currentGoal.isAccomplished
        }
    });

    return;
}