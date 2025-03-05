const FetchUserCollectionService = async (userId: string | null) => {
    try {
        const response = await fetch(`/api/collections/user/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Erreur lors de la récupération des collections :", error);
      }
}

export default FetchUserCollectionService