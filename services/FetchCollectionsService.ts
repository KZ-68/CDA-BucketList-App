import useSWR from "swr";

const fetcher = (url:string) => fetch(url).then((res) => res.json());

const FetchCollectionsService = ()  => {
    const {data: res, error} = useSWR(`/api/collections`, fetcher);
    if(error) return console.error("Erreur lors de la récupération des collections :", error);
    return res
}

export default FetchCollectionsService;