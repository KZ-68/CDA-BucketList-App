import useSWR from "swr";

const fetcher = (url:string) => fetch(url).then((res) => res.json());

const FetchGoalService = (goalId: string | string[] | undefined) => {
    const {data: res, error} = useSWR(`/api/goals/${goalId}`, fetcher);
    if(error) return console.error("Erreur lors de la récupération des goals :", error);
    return res;
}

export default FetchGoalService