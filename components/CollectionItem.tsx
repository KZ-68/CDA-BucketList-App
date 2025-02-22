import { PiRocketFill } from "react-icons/pi";
import { MdRemoveRedEye } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { IoHourglass } from "react-icons/io5";
import Link from 'next/link';

interface CollectionItemProps {
   id : string;
   label: string;
   totalGoal: number;
   achievedGoal: number;
   isPrivate: boolean;

  }

   const CollectionItem = ( { label, achievedGoal, totalGoal, isPrivate, id }: CollectionItemProps) => {

   let collectionState = "";
   let progression = 0;
   let IconComponent = IoHourglass;

   let color = "accentColor";
   let bgcolor = "darkGrey";
   let textColor = "neutralWhite";
   let goalTextColor = "neutralWhite";
   let textWeight = "500";

   if (achievedGoal === 0) {
      collectionState = "Not Started";
      progression = 0;
      IconComponent = IoHourglass;
      color = "thirdColor"
      bgcolor = "darkGrey"
      textColor = "neutralWhite"
      goalTextColor = "thirdColor"
      textWeight = "500"
   } else if (achievedGoal === totalGoal) {
      progression = Math.round((achievedGoal / totalGoal) * 100);
      collectionState = "Completed";
      IconComponent = FaCircleCheck;
      color = "accentColor"
      bgcolor = "accentColor"
      textColor = "darkGrey"
      goalTextColor = "darkGrey"
      textWeight = "600"
   } else  {
      progression = Math.round((achievedGoal / totalGoal) * 100);
      collectionState = "In Progress";
      IconComponent = PiRocketFill;
      color = "secondColor"
      bgcolor = "darkGrey"
      textColor = "neutralWhite"
      goalTextColor = "secondColor"
      textWeight = "500"
   }

    return (
     <>
        <div className="flex justify-between mb-3">
            <p className=" w-[40%] text-lg">{collectionState}</p>
            <div className="flex items-center gap-3 w-[60%] content-end justify-between">
               <div className="relative w-[80%] h-[6px] bg-darkGrey rounded">
                  <div className="absolute top-0 left-0 w-[50%] h-full bg-accentColor rounded"
                     style={{ width: `${progression}%` }}
                  >
                  </div>
               </div>
               <p className="text-font-secondary text-base">{progression}%</p>
            </div>
        </div>
        <div className="flex justify-between gap-8 items-center w-full bg-darkGrey border border-solid border-secondColor rounded-2xl px-5 py-6 pl-9 relative"
            style={{ borderColor: `var(--${color})` , backgroundColor: `var(--${bgcolor})` }}>
            <div className=" w-14 h-14 text-4xl bg-mediumGrey rounded  border border-solid flex items-center justify-center rotate-45 "
                 style={{ color: `var(--${color})`, borderColor: `var(--${color})` }}>
               <div className="-rotate-45">
                  <IconComponent />
               </div>
            </div>
            <div className=" w-4/6 flex flex-col items-start justify-center text-lg" style={{fontWeight: textWeight}}>
               <Link href={`/collections/${id}`}>
                  <p className="w-full uppercase" style={{color :  `var(--${textColor})` }}>{label}</p>
               </Link>
               <p className="w-full text-left" style={{color: `var(--${goalTextColor})`}}>
                  {achievedGoal > 10 ? achievedGoal : `0${achievedGoal}`} / 
                  {totalGoal > 10 ? totalGoal : ` 0${totalGoal}`}
                  {totalGoal === 1 || totalGoal === 0   ? ' Goal' : ' Goals'}
               </p>
            </div>
            {!isPrivate && (
               <div className="absolute bottom-[5px] right-[10px] text-2xl" style={{color: `var(--${goalTextColor})`}}>
                  <a href={`${id}`}><MdRemoveRedEye /></a>
               </div>
            )}
        </div>
     </>
    );
  };
  
  export default CollectionItem;