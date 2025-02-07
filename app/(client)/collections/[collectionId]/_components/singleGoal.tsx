import { GoalType } from "@/types/types";

export function SingleGoal(goal: GoalType) {
    const getColorPriority = (priority: number | string) => {
        return {
            1: "bg-red-500 border-red-500",
            2: "bg-orange-500 border-orange-500",
            3: "bg-yellow-500 border-yellow-500",
            4: "bg-green-300 border-green-300",
            5: "bg-green-500 border-green-500",
        }[priority] || "bg-gray-500 border-gray-500";
    }


    return (
        <div className="bg-gray-900 rounded-xl py-2 px-4 my-4 w-full">
            <div className="flex flex-row justify-between items-center">
                <div className="flex gap-2 items-center justify-start">
                    <input type="checkbox" defaultChecked={goal.isAccomplished} value="done" id={goal.label} />
                    <label htmlFor={goal.label}>{goal.label}</label>
                </div>

                <i>...</i>
            </div>
            {/* divider */}
            <div>
                <div className="flex flex-row justify-between items-center my-4">
                    <h2 className="text-blue-400">{goal.category.label}</h2>
                    <p className={`
                        border-2 rounded-full 
                        size-7 ${getColorPriority(goal.priority || "0")}
                        flex justify-center items-center 
                        text-black`}
                    >
                        {goal.priority}
                    </p>
                </div>

                <p>{goal.description}</p>
            </div>
        </div>
    )
}