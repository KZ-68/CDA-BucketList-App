const FetchCollectionsService = async ()  => {
    const res = await fetch(`/api/collections`, {cache: 'force-cache'});
    const data = await res.json();
    return data;
}

export default FetchCollectionsService;