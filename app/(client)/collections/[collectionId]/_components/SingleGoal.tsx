import { GoalType } from "@/types/types";
import { Check } from "./Check";
import Image from "next/image";
import threeDot from "/public/three_dot.svg";
import { Divider } from "./Divider";
import { db } from "@/lib/db";

interface SingleGoalProps {
    goal: GoalType;
}

export function SingleGoal({ goal }: SingleGoalProps) {
    const getColorPriority = (priority: number | string) => {
        return {
            1: "red-500",
            2: "orange-500",
            3: "yellow-500",
            4: "green-300",
            5: "green-500",
        }[priority] || "gray-500";
    }

    async function changeState() {
        "use server";
        await fetchToggleGoal(goal.id);
        return;
    }

    return (
        <div
            id="single-goal-card"
            className={`
                py-2 px-4 my-2 w-full
                flex flex-col justify-center
                bg-[rgba(7,20,39,0.5)] 
                rounded-r-xl rounded-l-lg
                border-l-[2px] border-${getColorPriority(goal.priority || '0')}`
            }
        >
            <div className="flex flex-row justify-between items-center h-full">
                <div className="flex items-center">
                    <Check state={goal.isAccomplished} label={goal.label} changeState={changeState} />
                    <label htmlFor={goal.label}>{goal.label}</label>
                </div>

                <input type="checkbox" id={`${goal.id}-details`} className="hidden interactive-goals" />
                <label htmlFor={`${goal.id}-details`} className="cursor-pointer">
                    <Image
                        src={threeDot}
                        alt="three dot icon"
                        height={18.99}
                        className='select-none'
                    />
                </label>
            </div>


            <div className="hidden details-goals mt-4">
                <Divider />

                <div className="flex flex-row justify-between items-center my-4">
                    <h2 className="text-[#2CC7E1]">{goal.category.label}</h2>
                    <p className={`
                        border-2 rounded-full size-7 
                        border-${getColorPriority(goal.priority || '0')}
                        bg-${getColorPriority(goal.priority || "0")}
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

async function fetchToggleGoal(goalId: string) {
    const currentGoal = await db.goal.findUnique({
        where: {
            id: goalId
        }
    });

    if (!currentGoal) return null;

    const goal = await db.goal.update({
        where: {
            id: goalId
        },
        data: {
            isAccomplished: !currentGoal.isAccomplished
        }
    });

    return goal;
}
