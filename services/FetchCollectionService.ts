import useSWR from "swr";

const fetcher = (url:string) => fetch(url).then((res) => res.json());

const FetchCollectionService = (collectionId:string | string[] | undefined)  => {
    const {data : res, error} = useSWR(`/api/collections/${collectionId}`, fetcher);
    if(error) return console.error("Erreur lors de la récupération de la collection :", error);
    return res;
}

export default FetchCollectionService;