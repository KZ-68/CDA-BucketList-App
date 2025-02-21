import { CollectionType, GoalType } from "@/types/types";
import { db } from "@/lib/db";
import { SingleGoal } from "./_components/singleGoal";
import RoundPlus from "/public/add.svg";
import Image from "next/image";
import { Divider } from "./_components/Divider";

interface fetchResponse {
    collection: CollectionType,
    goals: GoalType[]
}

const Page = async ({ params }: {
    params: Promise<{ collectionId: string }>;
}) => {

    // const { userId } = await auth();

    // if (!userId) {
    //     return <div>Sign in to view this page</div>
    // }

    // const user = await currentUser();

    const { collectionId } = await params;

    const { collection, goals } = await fetchUserCollection(collectionId) as fetchResponse;

    const accomplishedGoals = goals.reduce((acc, goal) => acc + (goal.isAccomplished ? 1 : 0), 0);

    return (
        <div className="p-2 flex flex-col justify-center items-center bg-[#22324C]">
            <h1 className="text-5xl text-center">{collection.label}</h1>

            <div
                className="
                    w-32 h-8
                    my-4 
                    flex flex-row justify-center items-center text-center
                    bg-slate-800 
                    border-[#C6E8AA] rounded-md border-2"
            >
                <input type="radio" defaultChecked value={"toDo"} name="hasAccomplish" id="toDo"
                    className="hidden interactive-input-color"
                />
                <label
                    htmlFor="toDo"
                    className="cursor-pointer bg-slate-800 flex-1 rounded-sm transition-all text-lg"
                >
                    To do
                </label>

                <input type="radio" value={"done"} name="hasAccomplish" id="done"
                    className="hidden interactive-input-color"
                />
                <label
                    htmlFor="done"
                    className="cursor-pointer bg-slate-800 flex-1 rounded-sm transition-all text-lg"
                >
                    Done
                </label>
            </div>

            <div className="flex flex-row gap-4 justify-center items-center">
                <p>Sort by : </p>
                <select className="bg-[#506382] outline-none p-1">
                    <option value="date">Priority</option>
                    <option value="label">Label</option>
                </select>
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
                        <span className="text-[#C6E8AA]">{goals.length}</span>
                    </p>
                    <p>Goals</p>
                </div>
            </div>

            <Divider color="#ffffff" />

            <div className="flex flex-row w-36 justify-center items-center text-center my-4 rounded-md bg-slate-800 border-[#071427] border-2">
                <input type="radio" defaultChecked={collection.isPrivate} value="private" name="privacy" id="private" className="hidden interactive-input-grey" />
                <label
                    htmlFor="private"
                    className="cursor-pointer bg-slate-800 flex-1 rounded-sm transition-all"
                >
                    Private
                </label>

                <input type="radio" defaultChecked={!collection.isPrivate} value="public" name="privacy" id="public" className="hidden interactive-input-grey" />
                <label
                    htmlFor="public"
                    className="cursor-pointer bg-slate-800 flex-1 rounded-sm transition-all"
                >
                    Public
                </label>
            </div>

            {goals.map((goal) =>
                <SingleGoal goal={goal} key={goal.id} />
            )}
        </div>
    )
}

export default Page;

async function fetchUserCollection(collectionId: string) {
    const response = await fetch(`http://localhost:3000/api/collections/${collectionId}`);
    const data = await response.json();

    const goals = await db.goal.findMany({
        where: {
            collectionId: collectionId
        },
        include: {
            category: true
        },
        orderBy: {
            priority: 'desc'
        }
    });

    return { collection: data.data, goals };
}