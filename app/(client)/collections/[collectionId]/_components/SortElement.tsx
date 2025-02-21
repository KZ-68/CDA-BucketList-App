"use client"
interface Props {
    toggleSort: (sortType: string, currentSearchParams: URLSearchParams) => void;
}

export function SortElement({ toggleSort }: Props) {
    const currentSearchParams = new URLSearchParams(window.location.search);
    return (<>
        <p>Sort by : </p>
        <select
            className="bg-[#506382] outline-none p-1"
            onChange={(e) => toggleSort(e.target.value, currentSearchParams)}
        >
            <option value="">None</option>
            <option value="priority">Priority</option>
            <option value="label">Label</option>
            <option value="createAt">Date</option>
        </select>
    </>
    )
}