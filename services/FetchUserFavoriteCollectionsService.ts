const FetchUserFavoriteCollectionsService = async (userId: string | null) => {
    if (!userId) throw new Error("User ID is required");
    try {
        const response =await fetch(`/api/user/${userId}/likedCollections`, {cache: 'force-cache'});
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error when fetching the user favorites collections:", error);
      }
}

export default FetchUserFavoriteCollectionsService;

