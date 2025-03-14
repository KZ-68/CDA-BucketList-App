import Link from "next/link";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
interface AllCollectionItemProps {
  title: string;
  username: string;
  numberGoals: number;
  numberLikes: number;
  isLiked: boolean;
  onLikeToggle: () => void;
  goals: GoalProp[];
  userId: string;
}

interface GoalProp {
  id: string;
  label: string;
}

const AllCollectionItem = ({title, username, numberGoals, numberLikes, isLiked, onLikeToggle, goals, userId}: AllCollectionItemProps) => {

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleGoals = () => {
    setIsExpanded((prev) => !prev);
  };

  const color = isLiked ? "secondColor" : "accentColor";
  const starColor = isLiked ? "secondColor" : "darkGrey";
  const starBorder = isLiked ? "secondColor" : "accentColor";

  return (
    <div className="flex flex-col gap-2">
      <div
        className="bg-darkGrey border border-solid rounded-2xl px-4 pt-4 pb-6"
        style={{ borderColor: `var(--${color})` }}
      >
        <div className="flex items-center justify-between">
          <p className="uppercase text-xl">{title}</p>
          <Link href={`/user/${username}`}>
            <p className="opacity-75 hover:opacity-100 transition-all">
              {username}
            </p>
          </Link>
        </div>

        <div className="">
          <p style={{ color: `var(--${color})` }}>
            {" "}
            {numberGoals} {numberGoals > 1 ? "Goals" : "Goal"}
          </p>
        </div>

        <div className="flex justify-end text-3xl cursor-pointer">
          <MdKeyboardArrowRight
            onClick={toggleGoals}
            className={`transition-transform duration-300 ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </div>

        {isExpanded && (
          <div className="">
            <div className="w-full h-[1px] bg-slate-50 my-4 opacity-80"></div>
            <div>
              {goals.map((goal: GoalProp, index: number) => (
                <p key={goal.id} className="">
                  {index < 10 ? "0" : ""}
                  {index + 1} - {goal.label}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-end justify-end gap-2">
        <p className="flex items-end leading-none ">{numberLikes}</p>
        <button onClick={onLikeToggle} className="cursor-pointer">
          <FaStar
            className="text-[25px] cursor-pointer hover:fill-accentColor  transition-all"
            style={{
              color: `var(--${starColor})`,
              stroke: `var(--${starBorder})`,
              strokeWidth: "25px",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default AllCollectionItem;
