import useSWR from "swr";

const fetcher = (url:string) => fetch(url).then((res) => res.json());

const FetchAllGoalsService = () => {
    const { data: dataGoals } = useSWR(`/api/goals`, fetcher);
    
    return dataGoals;
}

export default FetchAllGoalsService