"use client"

import { usePathname, useSearchParams } from "next/navigation";

interface Props {
    toggleSort: (
        sortType: string,
        currentSearchParams: {
            pathname: string,
            searchParams: URLSearchParams
        }
    ) => void;
}

export function SortElement({ toggleSort }: Props) {
    const currentSearchParams = {
        pathname: usePathname(),
        searchParams: useSearchParams()
    }

    return (<>
        <p>Sort by : </p>
        <select
            className="bg-[#506382] outline-none p-1"
            onChange={(e) => toggleSort(e.target.value, currentSearchParams)}
            defaultValue={currentSearchParams.searchParams.get('sortBy') || ""}
        >
            <option value="priority">Priority</option>
            <option value="label">Label</option>
            <option value="createdAt">Date</option>
        </select>
    </>
    )
}