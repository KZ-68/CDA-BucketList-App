import GlobalProgressChart from "./GlobalProgressChart";
import ProgressBar from "./ProgressBar";
import RenderCategoriesProgress from "./RenderCategoriesProgress";

interface CategoriesProgress {
    categoryId: string;
    categoryName: string;
    goalsCompleted: number;
    totalGoals: number;
    progress: string
}

interface GlobalProgressProps {   
    totalGoals: number;
    goalsAccomplished: number;
    totalGoalsPercent: string;
    notStarted: string;
    completed: string;
    inProgress: string;
    categoriesProgress: CategoriesProgress[]
}

const GlobalProgress = ( 
    { 
        totalGoals, 
        goalsAccomplished, 
        totalGoalsPercent, 
        notStarted, 
        completed, 
        inProgress,
        categoriesProgress
    }: GlobalProgressProps
    ) => {

    return (
        <div className="flex flex-col items-center gap-3 my-4 py-4 rounded-lg border-[2px] border-cyan-500 bg-[#18243c]">
            <div className="mx-3 my-2">
                <h3 className="text-2xl">Goals : {goalsAccomplished} / {totalGoals}</h3>
            </div>
            <ProgressBar bg_color={'bg-[#30c4e4]'} progress={totalGoalsPercent} />
            <p><span className="text-[#30c4e4]">{totalGoalsPercent}%</span> of your bucket list</p>
            
            <div className="mx-3 my-2">
                <h3 className="text-2xl">Collections :</h3>
            </div>
            <div>
                <GlobalProgressChart notStarted={notStarted} completed={completed} inProgress={inProgress} />
            </div>
            <RenderCategoriesProgress categories={categoriesProgress} />
        </div>
    );
}

export default GlobalProgress;