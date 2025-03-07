import { CollectionType, GoalType } from "@/types/types";
import { SingleGoal } from "./_components/SingleGoal";
import RoundPlus from "/public/add.svg";
import Image from "next/image";
import { Divider } from "./_components/Divider";
import { TogglePrivacy } from "./_components/TogglePrivacy";
import { SortElement } from "./_components/SortElement";
import { ToggleAccomplish } from "./_components/ToggleAccomplish";
import { Metadata } from "next";
import { fetchUserCollection, isOwnerLogged, toggleCollection, toggleGoal, togglePrivacy, toggleSort } from "./_services/collectionService";

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
    const collectionId = (await params).collectionId
    const { collection } = await fetchUserCollection(collectionId);
    return { title: collection.label }
}

const Page = async ({ params, searchParams }: PageProps) => {
    const { collectionId } = await params;
    const { byAccomplished, sortBy } = await searchParams;

    const { collection, goals, totalGoalsCount } = await fetchUserCollection(collectionId, byAccomplished, sortBy) as fetchResponse;
    const accomplishedGoals = goals.reduce((acc, goal) => acc + (goal.isAccomplished ? 1 : 0), 0);
    const isOwner = await isOwnerLogged(collectionId);

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
                <ToggleAccomplish isAccomplished ToggleCollection={toggleCollection} />
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
                <TogglePrivacy collection={collection} togglePrivacy={togglePrivacy} />
            </div>

            {goals.map((goal) =>
                <SingleGoal goal={goal} isOwner={isOwner} key={goal.id} fetchToggleGoal={toggleGoal} />
            )}
        </div>
    )
}

export default Page;