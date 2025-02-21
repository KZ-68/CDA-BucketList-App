interface DividerProps {
    color?: string;
}

export function Divider({ color = "#2CC7E1" }: DividerProps) {
    return (
        <div className={`bg-[${color}] h-[1px] w-full`}>
        </div>
    )
}