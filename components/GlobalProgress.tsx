import GlobalProgressChart from "./GlobalProgressChart";
import ProgressBar from "./ProgressBar";

interface GlobalProgressProps {   
    totalGoals: number;
    goalsAccomplished: number;
    totalGoalsPercent: string;
    notStarted: string;
    completed: string;
    inProgress: string;
}

const GlobalProgress = ( 
    { 
        totalGoals, 
        goalsAccomplished, 
        totalGoalsPercent, 
        notStarted, 
        completed, 
        inProgress 
    }: GlobalProgressProps
    ) => {

    return (
        <div className="flex flex-col items-center gap-3 my-4 py-4 rounded-lg border-[2px] border-cyan-500 bg-[#18243c]">
            <div className="mx-3 my-2">
                <h3 className="text-white">Goals : {goalsAccomplished} / {totalGoals}</h3>
            </div>
            <ProgressBar progress={totalGoalsPercent} />
            <p className="text-white"><span className="text-[#30c4e4]">{totalGoalsPercent}%</span> of your bucket list</p>
            
            <div className="mx-3 my-2">
                <h3 className="text-white">Collections :</h3>
            </div>
            <div>
                <GlobalProgressChart notStarted={notStarted} completed={completed} inProgress={inProgress} />
            </div>
        </div>
    );
}

export default GlobalProgress;