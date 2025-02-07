import { CollectionType, GoalType } from "@/types/types";
import { db } from "@/lib/db";
import { SingleGoal } from "./_components/singleGoal";

interface fetchResponse {
    collection: CollectionType,
    goals: GoalType[]
}

export default async function Page({
    params,
}: {
    params: { collectionId: string };
}) {

    // const { userId } = await auth();

    // if (!userId) {
    //     return <div>Sign in to view this page</div>
    // }

    // const user = await currentUser();

    const { collectionId } = await params;

    const { collection, goals } = await fetchUserCollection(collectionId) as fetchResponse;

    const accomplishedGoals = goals.reduce((acc, goal) => acc + (goal.isAccomplished ? 1 : 0), 0);

    return (
        <div className="p-2 flex flex-col justify-center items-center">
            <h1 className="text-5xl text-center">{collection.label}</h1>

            <div 
                className="
                    w-28 my-4 
                    flex flex-row justify-center items-center text-center
                    bg-slate-800 
                    border-[#C6E8AA] rounded-md border-2"
            >
                <input type="radio" value={"toDo"} name="hasAccomplish" id="toDo" className="hidden interactive-input-color" />
                <label htmlFor="toDo" className="cursor-pointer bg-slate-800 flex-1 rounded-sm transition-all">To do</label>

                <input type="radio" value={"done"} name="hasAccomplish" id="done" className="hidden interactive-input-color" />
                <label htmlFor="done" className="cursor-pointer bg-slate-800 flex-1 rounded-sm transition-all">Done</label>
            </div>

            <div className="flex flex-row gap-4 justify-center items-center">
                <p>Sort by : </p>
                <select className="bg-slate-800 outline-none p-1">
                    <option value="date">Date</option>
                    <option value="label">Label</option>
                </select>
            </div>

            <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-4 p-4">
                    <i className="border-white border-2 rounded-full h-5 w-5 flex justify-center items-center">+</i>
                    <p>New goal</p>
                </div>

                <div className="flex flex-row gap-4 p-4">
                    {accomplishedGoals} /
                    {goals.length}
                    <p>Goals</p>
                </div>
            </div>

            <div className="flex flex-row w-36 justify-center items-center text-center my-4 rounded-md bg-slate-800 border-[#071427] border-2">
                <input type="radio" value="private" name="privacy" id="private" className="hidden interactive-input-grey" />
                <label htmlFor="private" className="cursor-pointer bg-slate-800 flex-1 rounded-sm transition-all">Private</label>

                <input type="radio" value="public" name="privacy" id="public" className="hidden interactive-input-grey" />
                <label htmlFor="public" className="cursor-pointer bg-slate-800 flex-1 rounded-sm transition-all">Public</label>
            </div>

            {goals.map((goal) => SingleGoal(goal))}
        </div>
    )
}

async function fetchUserCollection(collectionId: string) {
    const response = await fetch(`http://localhost:3000/api/collections/${collectionId}`);
    const data = await response.json();

    const goals = await db.goal.findMany({
        where: {
            collectionId: collectionId
        },
        include: {
            category: true
        }
    });

    return { collection: data.data, goals };
}