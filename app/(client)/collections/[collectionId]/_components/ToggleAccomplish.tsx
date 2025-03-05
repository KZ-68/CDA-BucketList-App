"use client"

import { usePathname, useSearchParams } from "next/navigation";

interface Props {
    isAccomplished: boolean;
    ToggleCollection: (
        sortType: string,
        currentSearchParams: {
            pathname: string,
            searchParams: URLSearchParams
        }
    ) => void;
}

export function ToggleAccomplish({ ToggleCollection }: Props) {
    const currentSearchParams = {
        pathname: usePathname(),
        searchParams: useSearchParams()
    }
    return (<>
        <input 
            type="radio" 
            defaultChecked={currentSearchParams.searchParams.get("byAccomplished") === "todo"} 
            value={"todo"} 
            name="hasAccomplish" id="todo"
            className="hidden interactive-input-color"
            onChange={(e) => ToggleCollection(e.target.value, currentSearchParams)}
        />
        <label
            htmlFor="todo"
            className="cursor-pointer bg-slate-800 flex-1 rounded-sm transition-all text-lg"

        >
            To do
        </label>

        <input 
            type="radio" 
            value={"done"} 
            defaultChecked={currentSearchParams.searchParams.get("byAccomplished") === "done"} 
            name="hasAccomplish" id="done"
            className="hidden interactive-input-color"
            onChange={(e) => ToggleCollection(e.target.value, currentSearchParams)}
        />
        <label
            htmlFor="done"
            className="cursor-pointer bg-slate-800 flex-1 rounded-sm transition-all text-lg"
        >
            Done
        </label>
    </>
    )
}