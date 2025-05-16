import useSWR from "swr";

const fetcher = (url:string) => fetch(url).then((res) => res.json());

const FetchUserCollectionService = (userId: string | null) => {
    
  const {data : response, error} = useSWR(`/api/collections/user/${userId}`, fetcher);
  if (error) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response;
      
}

export default FetchUserCollectionService