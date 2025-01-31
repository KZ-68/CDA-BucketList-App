import { CollectionType, GoalType } from "@/types/types";

export default async function Page() {
    const collection = await fetchUserCollection() as CollectionType;
    const goals = collection.goals as GoalType[];

    return (
        <>
            <h2>{collection.label}</h2>
            <div>
                {goals.map((goal) => (
                    <div key={goal.id}>
                        <h3>{goal.label}</h3>
                        <p>{goal.description}</p>
                        <p>{goal.isAccomplished ? "Done !!" : "X"}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

async function fetchUserCollection() {
    const response = await fetch('api/collections/user');
    const data = await response.json();
    return data.data;
}