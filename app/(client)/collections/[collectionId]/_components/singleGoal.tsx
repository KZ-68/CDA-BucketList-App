import { GoalType } from "@/types/types";
import { Check } from "./Check";
import Image from "next/image";
import threeDot from "/public/three_dot.svg";

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

    console.log("Acoompp:", goal.isAccomplished);
    console.log("Label:", goal.label);

    return (
        <div
            className={`
                bg-[rgba(7,20,39,0.5)] 
                rounded-r-xl rounded-l-lg py-2 px-4 my-4 w-full h-20
                border-l-[2px] border-${getColorPriority(goal.priority || '0')}`
            }
        >

            <div className="flex flex-row justify-between items-center h-full">
                <div className="flex items-center">
                    <Check state={goal.isAccomplished} label={goal.label} />
                    <label htmlFor={goal.label}>{goal.label}</label>
                </div>

                <Image
                    src={threeDot}
                    alt="three dot icon"
                    height={18.99}
                    className='select-none'
                />
            </div>
            {/* divider */}
            {/* <div>
                <div className="flex flex-row justify-between items-center my-4">
                    <h2 className="text-blue-400">{goal.category.label}</h2>
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
            </div> */}
        </div>
    )
}