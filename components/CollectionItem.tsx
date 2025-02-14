import { PiRocketFill } from "react-icons/pi";
import { MdRemoveRedEye } from "react-icons/md";

// interface CollectionItemProps {
//     text: string;
//     color: string;
//     icon: React.ComponentType;
//     totalGoal: number;
//     achievedGoal: number;
//     isPrivate: boolean;
//     isCompleted: boolean;
//     progression: number;
//   }
  
//   const CollectionItem = ({ text, color, icon: Icon, totalGoal, achievedGoal, isPrivate, isCompleted, progression }: CollectionItemProps) => {
    const CollectionItem = () => {
    return (
     <div>
        <div className="flex justify-between mb-3">
            <p className=" w-[40%] text-lg">In progress</p>
            <div className="flex items-center gap-3 w-[60%] content-end justify-between">
               <div className="relative w-[80%] h-[6px] bg-darkGrey rounded">
                  <div className="absolute top-0 left-0 w-[50%] h-full bg-accentColor rounded"></div>
               </div>
               <p className="text-font-secondary text-base">50%</p>
            </div>
        </div>
        <div className="flex justify-between items-center w-full bg-darkGrey border border-solid border-secondColor rounded-2xl px-5 py-6 pl-9 relative">
            <div className="  text-4xl bg-mediumGrey rounded  border border-solid border-secondColor flex items-center justify-center w-[50px] h-[50px] rotate-45 text-secondColor ">
               <PiRocketFill />
            </div>
            <div className="flex flex-col items-center justify-center text-lg">
               <p className="w-full text-center font-600 uppercase">PROFESSIONAL PROJECTS</p>
               <p className="w-full text-left text-secondColor">05 /10 Goals</p>
            </div>
            <div className="absolute bottom-[5px] right-[10px] text-secondColor text-2xl">
               <MdRemoveRedEye />
            </div>
        </div>
     </div>
    );
  };
  
  export default CollectionItem;