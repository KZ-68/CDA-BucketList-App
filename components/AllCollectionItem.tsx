import { FaStar } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

interface AllCollectionItemProps {
    title: string;
    username : string;
    numberGoals : number;
    isLiked : boolean;
    onLikeToggle: () => void;
  }
  
  const AllCollectionItem = ({ title, username, numberGoals, isLiked, onLikeToggle }: AllCollectionItemProps) => {

    let color = "accentColor";
    let starColor = "darkGrey";
    let starBorder = "accentColor"
    if (isLiked === true) {
        color = "secondColor"
        starColor = "secondColor"
        starBorder = "secondColor"
    } else {
        color = 'accentColor'
        starColor = "darkGrey"
        starBorder = "accentColor"
    }

    return (
      <div className ="flex flex-col gap-2" >
        <div className="bg-darkGrey border border-solid rounded-2xl px-4 py-4 "
            style={{ borderColor: `var(--${color})` }}
        >
            <div className="flex items-center justify-between">
                <p className="uppercase text-xl">{title}</p>
                <p className="opacity-75">{username}</p>
            </div>

            <div className="">
                <p style={{ color: `var(--${color})`}}> {numberGoals}  {numberGoals > 1 ? 'Goals' : 'Goal'}</p>
            </div>

            <div className="flex justify-end text-3xl cursor-pointer">
                <MdKeyboardArrowRight />
            </div>
        </div>

        <div className="flex justify-end">
        <button onClick={onLikeToggle} className="cursor-pointer">
            <FaStar className="text-[25px] cursor-pointer hover:fill-accentColor  transition-all" 
                style={{  
                    color: `var(--${starColor})`,
                    stroke: `var(--${starBorder})`,
                    strokeWidth: '25px',
                }} />
        
        </button>
      </div>
        
      </div>
    );
  };
  
  export default AllCollectionItem;