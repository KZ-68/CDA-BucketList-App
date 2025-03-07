const FetchGoalService = async (goalId: string | string[] | undefined) => {
    const res = await fetch(`/api/goals/${goalId}`);
    const data = await res.json();
    return data;
}

export default FetchGoalService