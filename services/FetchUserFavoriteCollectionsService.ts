import useSWR from "swr";

const fetcher = (url:string) => fetch(url).then((res) => res.json());

const FetchUserFavoriteCollectionsService = (userId: string | null) => {
  if (!userId) throw new Error("User ID is required");

  const {data : response, error} = useSWR(`/api/user/${userId}/liked-collections`, fetcher);
  if (error) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;

}

export default FetchUserFavoriteCollectionsService;

