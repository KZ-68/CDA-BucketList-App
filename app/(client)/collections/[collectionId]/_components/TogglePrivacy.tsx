"use client"
import { CollectionType } from "@/types/types";

interface Props {
    collection: CollectionType;
    togglePrivacy: (privacy: string, collectionId: string) => void;
}

export function TogglePrivacy({ collection, togglePrivacy }: Props) {
    return (<>
        <input type="radio" defaultChecked={collection.isPrivate} value="private" name="privacy" id="private" className="hidden interactive-input-grey" />
        <label
            htmlFor="private"
            className="cursor-pointer bg-slate-800 flex-1 rounded-sm transition-all"
            onClick={() => togglePrivacy('private', collection.id)}
        >
            Private
        </label>

        <input type="radio" defaultChecked={!collection.isPrivate} value="public" name="privacy" id="public" className="hidden interactive-input-grey" />
        <label
            htmlFor="public"
            className="cursor-pointer bg-slate-800 flex-1 rounded-sm transition-all"
            onClick={() => togglePrivacy('public', collection.id)}
        >
            Public
        </label>
    </>
    )
}