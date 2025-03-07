const FetchAllCollectionsService = async ()  => {
    const res = await fetch(`/api/collections/all`, {cache: 'force-cache'});
    const data = await res.json();

    return data;
}

export default FetchAllCollectionsService;