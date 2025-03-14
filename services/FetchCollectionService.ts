const FetchCollectionService = async (collectionId:string | string[] | undefined)  => {
    const res = await fetch(`/api/collections/${collectionId}`);
    const data = await res.json();
    return data;
}

export default FetchCollectionService;