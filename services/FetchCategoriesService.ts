const FetchCategoriesService = async () => {
    const res = await fetch(`/api/categories/`, {cache: 'force-cache'});
    const data = await res.json();
    return data;
}

export default FetchCategoriesService