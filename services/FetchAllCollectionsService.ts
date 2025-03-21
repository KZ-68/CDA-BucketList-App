import useSWR from "swr";

const fetcher = (url:string) => fetch(url).then((res) => res.json());

const FetchAllCollectionsService = ()  => {
  const { data: dataCollection } = useSWR('/api/collections/all', fetcher);

    return dataCollection;
}

export default FetchAllCollectionsService;