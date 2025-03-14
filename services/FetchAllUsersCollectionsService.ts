const FetchAllUsersCollectionService = async () => {
    try {
        const response = await fetch(`/api/collections/user`);
        const data = await response.json();
        return data;
    } catch (error) {
    console.error("Erreur lors de la récupération des collections :", error);
    }
}

export default FetchAllUsersCollectionService