import { CollectionType, GoalType } from "@/types/types";
import { singleGoal } from "./_components/singleGoal";
import { db } from "@/lib/db";

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
    return (
        <div className="p-2">
            <h2>{`${collection.label} :`}</h2>

            <div>
                <input type="radio" value={"toDo"} name="hasAccomplish" id="toDo" />
                <label htmlFor="toDo">To do</label>

                <input type="radio" value={"done"} name="hasAccomplish" id="done" />
                <label htmlFor="done">Done</label>
            </div>

            <div>
                <p>Sort by : </p>
                <select>
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
                    {goals.reduce((acc, goal) => acc + (goal.isAccomplished ? 1 : 0), 0)} /
                    {goals.length}
                    <p>Goals</p>
                </div>

            </div>


            <div>
                <input type="radio" value="private" name="privacy" id="private" />
                <label htmlFor="private">Private</label>

                <input type="radio" value="public" name="privacy" id="public" />
                <label htmlFor="public">Public</label>
            </div>

            {goals.map((goal) => singleGoal(goal))}
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