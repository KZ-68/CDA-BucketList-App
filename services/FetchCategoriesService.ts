import useSWR from "swr";

const fetcher = (url:string) => fetch(url).then((res) => res.json());

const FetchCategoriesService = () => {
    const {data : response, error} = useSWR(`/api/categories/`, fetcher);
    if(error) return console.error("Erreur lors de la récupération des collections :", error);
    return response;
}

export default FetchCategoriesService