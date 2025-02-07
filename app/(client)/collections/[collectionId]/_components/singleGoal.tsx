import { GoalType } from "@/types/types";

export function singleGoal(goal: GoalType) {

    return (
        <div className="bg-gray-900 rounded-xl py-2 px-4">
            <div>
                <div>
                    <input type="radio" checked={goal.isAccomplished} value="done" id={goal.label} />
                    <label htmlFor={goal.label}>{goal.label}</label>
                </div>

                <i>...</i>
            </div>
            {/* divider */}
            <div>
                <div className="flex flex-row justify-between gap-4">
                    <h2>{goal.category.label}</h2>
                    <p>{goal.priority}</p>
                </div>

                <p>{goal.description}</p>
            </div>
        </div>
    )
}